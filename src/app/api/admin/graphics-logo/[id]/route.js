import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'graphic_logo',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/logos"}],
  allowedRoles: ["admin","google_manager"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
