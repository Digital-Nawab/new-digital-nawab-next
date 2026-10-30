import { CityService } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class CityServiceController {
  static async index() {
    const data = await CityService.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await CityService.find(id);
    if (!data) return errorResponse('CityServiceController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/cityservice
          body[k] = await saveUploadedFile(v, 'cityservice', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await CityService.create(body);
      return jsonResponse({ status: true, message: 'CityServiceController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'cityservice', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await CityService.update(id, body);
      return jsonResponse({ status: true, message: 'CityServiceController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await CityService.delete(id);
    return jsonResponse({ status: success, message: success ? 'CityServiceController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }

  static async getCityServices(req) {
    const citySlug = req ? new URL(req.url, 'http://localhost').searchParams.get('city_slug') : null;
    const { getCityServices } = await import('./cityController.js');
    return getCityServices(citySlug);
  }
}

export default CityServiceController;
