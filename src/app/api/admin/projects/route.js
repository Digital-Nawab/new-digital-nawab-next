import { createCrudHandlers } from '@/../backend/helpers/crud-route.js';

const handlers = createCrudHandlers({
  table: 'projects',
  orderBy: 'id DESC',
  jsonFields: ['tech_used'],
  fileFields: [{"name":"image","dir":"assets/images/projects"},{"name":"video","dir":"assets/videos/projects"}],
  allowedRoles: ["admin","dev_manager"],
});

export const GET = handlers.GET;
export const POST = handlers.POST;
