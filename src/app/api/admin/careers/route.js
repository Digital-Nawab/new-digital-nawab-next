import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'careers',
  orderBy: 'id DESC',
  jsonFields: ['responsibilities', 'requirements', 'benefits_perks'],
  allowedRoles: ['admin'],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
