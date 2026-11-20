import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'graphic_logo',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/logos"}],
  allowedRoles: ["admin","google_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
