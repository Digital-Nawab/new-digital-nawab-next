import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'sm_youtube',
  jsonFields: ["features"],
  fileFields: [{"name":"image","dir":"assets/images/smm"}],
  allowedRoles: ["admin","social_manager"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
