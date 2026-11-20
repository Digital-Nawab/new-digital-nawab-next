import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'dev_commerces',
  orderBy: 'id DESC',
  jsonFields: ["skills"],
  fileFields: [{"name":"image","dir":"assets/images/dev"}],
  allowedRoles: ["admin","dev_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
