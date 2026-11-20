import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'google_ppc',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/google"}],
  allowedRoles: ["admin","google_manager"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
