import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'pricing_sections',
  orderBy: 'id DESC',
  jsonFields: ['packages'],
  allowedRoles: ['admin'],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
