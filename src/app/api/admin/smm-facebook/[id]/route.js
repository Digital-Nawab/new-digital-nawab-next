import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'sm_facebook',
  jsonFields: [],
  fileFields: [],
  allowedRoles: ["admin","social_manager"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
