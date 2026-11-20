import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'seo_services',
  orderBy: 'id DESC',
  jsonFields: ["features"],
  fileFields: [{"name":"image","dir":"assets/images/seo"}],
  allowedRoles: ["admin","seo_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
