import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'contact_details',
  orderBy: 'id DESC',
  jsonFields: ['email', 'phone_no', 'whatsapp_no'],
  fileFields: [],
  allowedRoles: ["admin"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
