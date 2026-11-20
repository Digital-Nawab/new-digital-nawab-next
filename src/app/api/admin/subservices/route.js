import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'subservices',
  orderBy: 'id ASC',
  fileFields: [{ name: 'image', dir: 'assets/images/subservices' }],
  allowedRoles: ['admin'],
  beforeSave: async (data) => {
    if (data.is_deleted === undefined) data.is_deleted = 0;
    return data;
  },
});

export const GET = handlers.GET;
export const POST = handlers.POST;
