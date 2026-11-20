import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'social_our_service',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/smm"}],
  allowedRoles: ["admin","social_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
