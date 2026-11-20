import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'projects',
  jsonFields: ['tech_used'],
  fileFields: [{"name":"image","dir":"assets/images/projects"},{"name":"video","dir":"assets/videos/projects"}],
  allowedRoles: ["admin","dev_manager"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
