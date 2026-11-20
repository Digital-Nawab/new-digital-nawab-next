import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'home_abouts',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/about"}],
  allowedRoles: ["admin","home_manager"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
