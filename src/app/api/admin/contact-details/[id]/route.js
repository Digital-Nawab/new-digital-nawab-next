import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'contact_details',
  jsonFields: ['email', 'phone_no', 'whatsapp_no'],
  fileFields: [],
  allowedRoles: ["admin"],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
