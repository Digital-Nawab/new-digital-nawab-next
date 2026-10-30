import { query } from '../database/db.js';
import { jsonResponse } from '../utils/api-helpers.js';

export class AdminController {
  static async index() {
    const [usersCount] = await query('SELECT COUNT(*) as c FROM users');
    const [enquiriesCount] = await query('SELECT COUNT(*) as c FROM enquiries WHERE isDeleted = 0');
    const [servicesCount] = await query('SELECT COUNT(*) as c FROM services');
    const [blogsCount] = await query('SELECT COUNT(*) as c FROM blogs');
    const [projectsCount] = await query('SELECT COUNT(*) as c FROM projects');

    return jsonResponse({
      status: true,
      data: {
        stats: {
          users: Number(usersCount?.c || 0),
          enquiries: Number(enquiriesCount?.c || 0),
          services: Number(servicesCount?.c || 0),
          blogs: Number(blogsCount?.c || 0),
          projects: Number(projectsCount?.c || 0),
        },
      },
    });
  }
}

export default AdminController;

