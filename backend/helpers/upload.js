import fs from 'fs/promises';
import path from 'path';

/**
 * Clean filename to avoid path traversal and invalid characters.
 */
export function cleanFileName(name) {
  const ext = path.extname(name || '');
  const base = path.basename(name || '', ext);
  const clean = base.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim().replace(/\s+/g, '-');
  return { base: clean || 'file', ext: ext || '.webp' };
}

/**
 * Save an uploaded File from FormData to public directory.
 * @param {File} file - Browser/Next File object
 * @param {string} subDir - e.g. 'assets/images/blog'
 * @param {string} [customName] - optional custom name prefix
 * @returns {Promise<string>} relative path e.g. 'assets/images/blog/filename.webp'
 */
export async function saveUploadFile(file, subDir = 'assets/images/uploads', customName = null) {
  if (!file || typeof file === 'string' || !file.name) {
    return null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const targetDir = path.join(process.cwd(), 'public', subDir);
  await fs.mkdir(targetDir, { recursive: true });

  const { base, ext } = cleanFileName(file.name);
  const prefix = customName ? cleanFileName(customName).base : base;
  const timestamp = Date.now();
  const fileName = `${prefix}-${timestamp}${ext}`;

  const filePath = path.join(targetDir, fileName);
  await fs.writeFile(filePath, buffer);

  // Return standard relative path starting with subDir
  const normalizedSubDir = subDir.replace(/\\/g, '/').replace(/^\/+/, '');
  return `${normalizedSubDir}/${fileName}`;
}

/**
 * Delete a file from public folder safely.
 */
export async function deleteUploadedFile(relativePath) {
  if (!relativePath || typeof relativePath !== 'string') return;
  try {
    const cleanRel = relativePath.replace(/\\/g, '/').replace(/^\/+/, '');
    // Safety check: ensure file is inside public directory
    const fullPath = path.join(process.cwd(), 'public', cleanRel);
    const publicPath = path.join(process.cwd(), 'public');
    if (!fullPath.startsWith(publicPath)) {
      console.warn('Suspicious file deletion attempt blocked:', relativePath);
      return;
    }
    await fs.unlink(fullPath);
  } catch (err) {
    // Ignore if file doesn't exist
  }
}
