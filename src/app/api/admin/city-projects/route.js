import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'city_projects',
  orderBy: 'sort_order ASC, id ASC',
  fileFields: [{ name: 'image', dir: 'assets/images/city' }],
  allowedRoles: ['admin'],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
