import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'packages',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [],
  allowedRoles: ["admin"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
