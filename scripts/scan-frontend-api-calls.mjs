import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const matches = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        scanDir(full);
      }
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf-8');
      if (
        content.includes('dashboard.digitalnawab.com') ||
        content.includes('127.0.0.1:8000') ||
        content.includes('localhost:8000')
      ) {
        matches.push(full);
      }
    }
  }
}

scanDir(srcDir);
console.log('Files with external backend references:', matches);
