import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'home_abouts',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"image","dir":"assets/images/about"}],
  allowedRoles: ["admin","home_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
