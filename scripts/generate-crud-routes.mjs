import fs from 'fs';
import path from 'path';

const modules = [
  // Home Page
  {
    endpoint: 'hero',
    table: 'home_heros',
    fileFields: [{ name: 'video', dir: 'assets/heros' }],
    allowedRoles: ['admin', 'home_manager'],
  },
  {
    endpoint: 'home-about',
    table: 'home_abouts',
    fileFields: [{ name: 'image', dir: 'assets/images/about' }],
    allowedRoles: ['admin', 'home_manager'],
  },
  {
    endpoint: 'technologies',
    table: 'technology',
    fileFields: [{ name: 'img', dir: 'assets/technology' }],
    allowedRoles: ['admin', 'home_manager'],
  },
  {
    endpoint: 'faqs',
    table: 'faqs',
    allowedRoles: ['admin', 'home_manager'],
  },
  {
    endpoint: 'vision-mission',
    table: 'vision_mission',
    allowedRoles: ['admin', 'home_manager'],
  },
  {
    endpoint: 'creatives',
    table: 'creatives',
    fileFields: [{ name: 'image', dir: 'assets/images/creatives' }],
    allowedRoles: ['admin', 'design_manager'],
  },
  {
    endpoint: 'graphics-logo',
    table: 'graphic_logo',
    fileFields: [{ name: 'image', dir: 'assets/images/logos' }],
    allowedRoles: ['admin', 'google_manager'],
  },
  // Other
  {
    endpoint: 'contact-details',
    table: 'contact_details',
    allowedRoles: ['admin'],
  },
  {
    endpoint: 'our-team',
    table: 'our_team',
    fileFields: [{ name: 'img', dir: 'assets/images/team' }],
    allowedRoles: ['admin'],
  },
  {
    endpoint: 'packages',
    table: 'packages',
    allowedRoles: ['admin'],
  },
  {
    endpoint: 'package-features',
    table: 'package_features',
    allowedRoles: ['admin'],
  },
  {
    endpoint: 'projects',
    table: 'projects',
    fileFields: [
      { name: 'image', dir: 'assets/images/projects' },
      { name: 'video', dir: 'assets/videos/projects' },
    ],
    allowedRoles: ['admin', 'dev_manager'],
  },
  {
    endpoint: 'tags',
    table: 'tags',
    fileFields: [{ name: 'image', dir: 'assets/images/tags' }],
    allowedRoles: ['admin', 'seo_manager'],
  },
  // SEO
  {
    endpoint: 'seo-services',
    table: 'seo_services',
    jsonFields: ['features'],
    fileFields: [{ name: 'image', dir: 'assets/images/seo' }],
    allowedRoles: ['admin', 'seo_manager'],
  },
  {
    endpoint: 'seo-highlights',
    table: 'seo_highlights',
    fileFields: [{ name: 'image', dir: 'assets/images/seo' }],
    allowedRoles: ['admin', 'seo_manager'],
  },
  {
    endpoint: 'seo-forms',
    table: 'seo_forms',
    allowedRoles: ['admin', 'seo_manager'],
  },
  {
    endpoint: 'seo-processes',
    table: 'seo_processes',
    allowedRoles: ['admin', 'seo_manager'],
  },
  {
    endpoint: 'seo-digital',
    table: 'seo_digital',
    allowedRoles: ['admin', 'seo_manager'],
  },
  {
    endpoint: 'seo-optimization',
    table: 'seo_optimizations',
    allowedRoles: ['admin', 'seo_manager'],
  },
  {
    endpoint: 'seo-strategy',
    table: 'seo_strategies',
    fileFields: [{ name: 'image', dir: 'assets/images/seo' }],
    allowedRoles: ['admin', 'seo_manager'],
  },
  // Dev
  {
    endpoint: 'dev-commerce',
    table: 'dev_commerces',
    jsonFields: ['skills'],
    fileFields: [{ name: 'image', dir: 'assets/images/dev' }],
    allowedRoles: ['admin', 'dev_manager'],
  },
  {
    endpoint: 'dev-cornerstone',
    table: 'dev_cornerstones',
    allowedRoles: ['admin', 'dev_manager'],
  },
  {
    endpoint: 'dev-innovation',
    table: 'dev_innovations',
    jsonFields: ['features'],
    allowedRoles: ['admin', 'dev_manager'],
  },
  {
    endpoint: 'dev-maintain',
    table: 'dev_maintains',
    jsonFields: ['features'],
    allowedRoles: ['admin', 'dev_manager'],
  },
  {
    endpoint: 'dev-step',
    table: 'dev_steps',
    allowedRoles: ['admin', 'dev_manager'],
  },
  // Google
  {
    endpoint: 'google-campaigns',
    table: 'google_compaigns',
    fileFields: [{ name: 'image', dir: 'assets/images/google' }],
    allowedRoles: ['admin', 'google_manager'],
  },
  {
    endpoint: 'google-media',
    table: 'google_media',
    fileFields: [{ name: 'image', dir: 'assets/images/google' }],
    allowedRoles: ['admin', 'google_manager'],
  },
  {
    endpoint: 'google-ppc',
    table: 'google_ppc',
    fileFields: [{ name: 'image', dir: 'assets/images/google' }],
    allowedRoles: ['admin', 'google_manager'],
  },
  // SMM
  {
    endpoint: 'smm-facebook',
    table: 'sm_facebook',
    allowedRoles: ['admin', 'social_manager'],
  },
  {
    endpoint: 'smm-benefit',
    table: 'sm_benefits',
    fileFields: [{ name: 'image', dir: 'assets/images/smm' }],
    allowedRoles: ['admin', 'social_manager'],
  },
  {
    endpoint: 'smm-youtube',
    table: 'sm_youtube',
    jsonFields: ['features'],
    fileFields: [{ name: 'image', dir: 'assets/images/smm' }],
    allowedRoles: ['admin', 'social_manager'],
  },
  {
    endpoint: 'social-service',
    table: 'social_our_service',
    fileFields: [{ name: 'image', dir: 'assets/images/smm' }],
    allowedRoles: ['admin', 'social_manager'],
  },
];

const baseDir = path.join(process.cwd(), 'src', 'app', 'api', 'admin');

for (const mod of modules) {
  const modDir = path.join(baseDir, mod.endpoint);
  const idDir = path.join(modDir, '[id]');

  fs.mkdirSync(idDir, { recursive: true });

  const listRouteContent = `import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: '${mod.table}',
  orderBy: 'id DESC',
  jsonFields: ${JSON.stringify(mod.jsonFields || [])},
  fileFields: ${JSON.stringify(mod.fileFields || [])},
  allowedRoles: ${JSON.stringify(mod.allowedRoles || ['admin'])},
});

export const GET = handlers.GET;
export const POST = handlers.POST;
`;

  const itemRouteContent = `import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: '${mod.table}',
  jsonFields: ${JSON.stringify(mod.jsonFields || [])},
  fileFields: ${JSON.stringify(mod.fileFields || [])},
  allowedRoles: ${JSON.stringify(mod.allowedRoles || ['admin'])},
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
`;

  fs.writeFileSync(path.join(modDir, 'route.js'), listRouteContent, 'utf-8');
  fs.writeFileSync(path.join(idDir, 'route.js'), itemRouteContent, 'utf-8');
  console.log(`Generated: /api/admin/${mod.endpoint}`);
}

console.log('All admin CRUD routes generated successfully!');
