import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'home_heros',
  jsonFields: [],
  fileFields: [{"name":"video","dir":"assets/heros"}],
  allowedRoles: ["admin","home_manager"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
