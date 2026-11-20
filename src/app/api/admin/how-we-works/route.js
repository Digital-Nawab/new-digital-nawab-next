import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'how_we_works',
  orderBy: 'id DESC',
  jsonFields: ['steps'],
  allowedRoles: ['admin'],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
