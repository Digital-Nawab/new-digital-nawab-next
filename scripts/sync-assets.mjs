import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\xampp\\htdocs\\tanu-knk-salon-nextjs\\dn-backend\\public\\assets';
const destDir = path.join(process.cwd(), 'public', 'assets');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      if (!fs.existsSync(destPath)) {
        try {
          fs.copyFileSync(srcPath, destPath);
        } catch (e) {
          console.error(`Error copying ${entry.name}:`, e.message);
        }
      }
    }
  }
}

console.log('Syncing assets from dn-backend to Next.js public/assets...');
copyRecursive(srcDir, destDir);
console.log('Asset sync complete!');
