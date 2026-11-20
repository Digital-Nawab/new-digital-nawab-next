const fs = require('fs');
const path = require('path');

const backendDir = 'C:/xampp/htdocs/tanu-knk-salon-nextjs/dn-backend';

// 1. Models
const modelsDir = path.join(backendDir, 'app/Models');
const models = [];
if (fs.existsSync(modelsDir)) {
  for (const f of fs.readdirSync(modelsDir)) {
    if (f.endsWith('.php')) {
      const content = fs.readFileSync(path.join(modelsDir, f), 'utf8');
      const tableMatch = content.match(/protected\s+\$table\s*=\s*['"]([^'"]+)['"]/);
      const fillableMatch = content.match(/protected\s+\$fillable\s*=\s*\[([\s\S]*?)\];/);
      models.push({
        name: f.replace('.php', ''),
        file: f,
        table: tableMatch ? tableMatch[1] : null,
        fillable: fillableMatch ? fillableMatch[1].replace(/['"\s]/g, '').split(',').filter(Boolean) : []
      });
    }
  }
}

// 2. Inertia Pages
const pagesDir = path.join(backendDir, 'resources/js/Pages');
const adminPages = [];
function findPages(dir, prefix = '') {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      findPages(full, prefix ? `${prefix}/${item}` : item);
    } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
      adminPages.push(prefix ? `${prefix}/${item}` : item);
    }
  }
}
if (fs.existsSync(pagesDir)) findPages(pagesDir);

// 3. Controllers
const controllersDir = path.join(backendDir, 'app/Http/Controllers');
const controllers = [];
function findControllers(dir, prefix = '') {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      findControllers(full, prefix ? `${prefix}/${item}` : item);
    } else if (item.endsWith('.php')) {
      controllers.push(prefix ? `${prefix}/${item}` : item);
    }
  }
}
if (fs.existsSync(controllersDir)) findControllers(controllersDir);

console.log('=== LARAVEL AUDIT SUMMARY ===');
console.log('Total Models:', models.length);
console.log('Total Controllers:', controllers.length);
console.log('Total Admin Inertia Pages:', adminPages.length);

fs.writeFileSync('scripts/audit-report.json', JSON.stringify({
  models,
  controllers,
  adminPages
}, null, 2));

console.log('Saved detailed audit to scripts/audit-report.json');
