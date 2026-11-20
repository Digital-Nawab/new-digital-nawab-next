import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'seo_services',
  jsonFields: ["features"],
  fileFields: [{"name":"image","dir":"assets/images/seo"}],
  allowedRoles: ["admin","seo_manager"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
