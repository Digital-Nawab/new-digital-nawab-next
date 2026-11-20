import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'seo_strategies',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/seo"}],
  allowedRoles: ["admin","seo_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
