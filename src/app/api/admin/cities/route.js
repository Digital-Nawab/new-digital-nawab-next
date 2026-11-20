import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'cities',
  orderBy: 'name ASC',
  jsonFields: ['market_areas'],
  allowedRoles: ['admin'],
  beforeSave: async (data) => {
    if (data.is_active === undefined) data.is_active = 1;
    return data;
  },
});

export const GET = handlers.GET;
export const POST = handlers.POST;
