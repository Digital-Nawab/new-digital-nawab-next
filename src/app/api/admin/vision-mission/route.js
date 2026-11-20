import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'vision_mission',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [],
  allowedRoles: ["admin","home_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
