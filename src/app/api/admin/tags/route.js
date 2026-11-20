import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'tags',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/tags"}],
  allowedRoles: ["admin","seo_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
