import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'dev_innovations',
  orderBy: 'id DESC',
  jsonFields: ["features"],
  fileFields: [],
  allowedRoles: ["admin","dev_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
