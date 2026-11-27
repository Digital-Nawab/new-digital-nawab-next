import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'our_team',
  orderBy: 'id DESC',
  jsonFields: [],
  fileFields: [{"name":"img","dir":"assets/images/our_team"}],
  allowedRoles: ["admin"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
