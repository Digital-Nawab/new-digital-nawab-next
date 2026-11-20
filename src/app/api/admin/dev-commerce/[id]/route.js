import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'dev_commerces',
  jsonFields: ["skills"],
  fileFields: [{"name":"image","dir":"assets/images/dev"}],
  allowedRoles: ["admin","dev_manager"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
