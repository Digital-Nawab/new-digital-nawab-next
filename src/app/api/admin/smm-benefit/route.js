import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'sm_benefits',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/smm"}],
  allowedRoles: ["admin","social_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
