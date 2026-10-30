import { CityProject } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class CityProjectController {
  static async index() {
    const data = await CityProject.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await CityProject.find(id);
    if (!data) return errorResponse('CityProjectController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/cityproject
          body[k] = await saveUploadedFile(v, 'cityproject', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await CityProject.create(body);
      return jsonResponse({ status: true, message: 'CityProjectController created successfully', data: created }, 201);
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async update(id, request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          body[k] = await saveUploadedFile(v, 'cityproject', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await CityProject.update(id, body);
      return jsonResponse({ status: true, message: 'CityProjectController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await CityProject.delete(id);
    return jsonResponse({ status: success, message: success ? 'CityProjectController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }

  static async getCityProjects(req) {
    const citySlug = req ? new URL(req.url, 'http://localhost').searchParams.get('city_slug') : null;
    const { getCityProjects } = await import('./cityController.js');
    return getCityProjects(citySlug);
  }
}

export default CityProjectController;
