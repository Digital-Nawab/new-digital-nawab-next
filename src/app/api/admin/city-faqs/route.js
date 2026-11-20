import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'city_faqs',
  orderBy: 'id DESC',
  jsonFields: ['faqs'],
  allowedRoles: ['admin'],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
