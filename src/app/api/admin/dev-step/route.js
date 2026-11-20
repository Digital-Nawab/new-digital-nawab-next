import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'dev_steps',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [],
  allowedRoles: ["admin","dev_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
