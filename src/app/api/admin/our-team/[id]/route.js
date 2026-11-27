import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'our_team',
  jsonFields: [],
  fileFields: [{"name":"img","dir":"assets/images/our_team"}],
  allowedRoles: ["admin"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
