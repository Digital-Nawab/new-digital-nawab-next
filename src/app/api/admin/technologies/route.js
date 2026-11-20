import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'technology',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"img","dir":"assets/technology"}],
  allowedRoles: ["admin","home_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
