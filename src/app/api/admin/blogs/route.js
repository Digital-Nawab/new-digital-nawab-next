import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'blogs',
  orderBy: 'created_at DESC',
  jsonFields: ['keyword'],
  fileFields: [
    { name: 'card_img', dir: 'assets/images/blog' },
    { name: 'banner_img', dir: 'assets/images/blog' },
  ],
  allowedRoles: ['admin', 'writer'],
  beforeSave: async (data) => {
    if (!data.meta_key && data.title) data.meta_key = data.title;
    if (!data.meta_desc && data.description) data.meta_desc = data.description.replace(/<[^>]*>?/gm, '').slice(0, 160);
    if (!data.author) data.author = 'Admin';
    if (!data.published) data.published = new Date().toISOString().split('T')[0];
    return data;
  },
});

export const GET = handlers.GET;
export const POST = handlers.POST;
