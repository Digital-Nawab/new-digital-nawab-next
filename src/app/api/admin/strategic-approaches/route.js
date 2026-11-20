import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'strategic_approaches',
  orderBy: 'id DESC',
  jsonFields: ['items'],
  allowedRoles: ['admin'],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
