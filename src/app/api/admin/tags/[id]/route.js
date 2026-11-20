import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'tags',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/tags"}],
  allowedRoles: ["admin","seo_manager"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
