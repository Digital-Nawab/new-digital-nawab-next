import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'seo_digital',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [],
  allowedRoles: ["admin","seo_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
