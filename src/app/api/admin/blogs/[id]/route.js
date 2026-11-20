import { createCrudItemHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudItemHandlers({
  table: 'blogs',
  jsonFields: ['keyword'],
  fileFields: [
    { name: 'card_img', dir: 'assets/images/blog' },
    { name: 'banner_img', dir: 'assets/images/blog' },
  ],
  allowedRoles: ['admin', 'writer'],
});

export const GET = handlers.GET;
export const PUT = handlers.PUT;
export const POST = handlers.POST;
export const DELETE = handlers.DELETE;
