import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'sm_facebook',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [],
  allowedRoles: ["admin","social_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
