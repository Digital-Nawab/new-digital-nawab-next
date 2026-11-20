import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'creatives',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/creatives"}],
  allowedRoles: ["admin","design_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
