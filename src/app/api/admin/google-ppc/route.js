import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'google_ppc',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/google"}],
  allowedRoles: ["admin","google_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
