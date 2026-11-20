const fs = require('fs');
const path = require('path');

const endpoints = new Set();
const filesWithApi = {};

function search(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!f.startsWith('.') && f !== 'node_modules' && f !== '.next') search(full);
    } else if (f.endsWith('.js') || f.endsWith('.jsx')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/https:\/\/dashboard\.digitalnawab\.com\/api\/[a-zA-Z0-9_\-]+/g) || [];
      const apiMatches = content.match(/\/api\/[a-zA-Z0-9_\-]+/g) || [];
      const all = [...matches, ...apiMatches];
      for (const m of all) {
        const ep = m.replace('https://dashboard.digitalnawab.com', '');
        endpoints.add(ep);
        if (!filesWithApi[ep]) filesWithApi[ep] = [];
        if (!filesWithApi[ep].includes(full)) filesWithApi[ep].push(full);
      }
    }
  }
}

search('src');

console.log('=== FRONTEND API ENDPOINTS USED ===');
const sorted = Array.from(endpoints).sort();
for (const ep of sorted) {
  console.log(`${ep} (called in ${filesWithApi[ep].length} files)`);
}
