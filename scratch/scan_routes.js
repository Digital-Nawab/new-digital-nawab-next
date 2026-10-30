const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  let calls = new Set();
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      scanDir(full).forEach(c => calls.add(c));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.matchAll(/route\(\s*['"]([^'"]+)['"]/g);
      for (const m of matches) {
        calls.add(m[1]);
      }
    }
  });
  return calls;
}

const routes = Array.from(scanDir('c:/xampp/htdocs/tanu-knk-salon-nextjs/dn-backend/resources/js')).sort();
console.log('Unique route() calls found:', routes.length);
console.log(JSON.stringify(routes, null, 2));
