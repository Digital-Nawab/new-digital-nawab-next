import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
};

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params;
    const pathParts = resolvedParams?.path || [];
    if (!pathParts.length) {
      return new NextResponse('Asset not found', { status: 404 });
    }

    // Sanitize path against directory traversal
    const safeParts = pathParts.map((p) => p.replace(/[^a-zA-Z0-9_\-\.]/g, ''));
    const safePath = safeParts.join('/');
    const fileName = safeParts[safeParts.length - 1];

    const publicAssetsDir = path.join(process.cwd(), 'public', 'assets');
    const primaryCandidate = path.join(publicAssetsDir, safePath);

    const candidates = [primaryCandidate];

    // Handle cross-folder resolution for team images (team vs our_team)
    if (safePath.startsWith('images/team/')) {
      candidates.push(path.join(publicAssetsDir, 'images', 'our_team', fileName));
      candidates.push(path.join(publicAssetsDir, 'images', fileName));
    } else if (safePath.startsWith('images/our_team/')) {
      candidates.push(path.join(publicAssetsDir, 'images', 'team', fileName));
      candidates.push(path.join(publicAssetsDir, 'images', fileName));
    }

    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        const stat = fs.statSync(candidate);
        if (stat.isFile()) {
          const ext = path.extname(candidate).toLowerCase();
          const contentType = MIME_TYPES[ext] || 'application/octet-stream';
          const fileBuffer = fs.readFileSync(candidate);

          return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
              'Content-Type': contentType,
              'Content-Length': stat.size.toString(),
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          });
        }
      }
    }

    // Remote fallback to dashboard.digitalnawab.com for legacy uploaded assets
    const remoteUrls = [
      `https://dashboard.digitalnawab.com/assets/${safePath}`,
    ];
    if (safePath.startsWith('images/team/')) {
      remoteUrls.push(`https://dashboard.digitalnawab.com/assets/images/our_team/${fileName}`);
    } else if (safePath.startsWith('images/our_team/')) {
      remoteUrls.push(`https://dashboard.digitalnawab.com/assets/images/team/${fileName}`);
    }

    for (const remoteUrl of remoteUrls) {
      try {
        const remoteRes = await fetch(remoteUrl, { method: 'HEAD' });
        if (remoteRes.ok) {
          return NextResponse.redirect(remoteUrl, 307);
        }
      } catch (_) {
        // Continue to next candidate
      }
    }

    return new NextResponse('Asset not found', { status: 404 });
  } catch (err) {
    console.error('Asset route error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
