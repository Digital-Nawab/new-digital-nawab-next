import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'home_heros',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"video","dir":"assets/heros"}],
  allowedRoles: ["admin","home_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
