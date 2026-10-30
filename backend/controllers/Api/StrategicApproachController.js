import { StrategicApproach } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class StrategicApproachController {
  static async index() {
    const data = await StrategicApproach.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await StrategicApproach.find(id);
    if (!data) return errorResponse('StrategicApproachController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/strategicapproach
          body[k] = await saveUploadedFile(v, 'strategicapproach', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await StrategicApproach.create(body);
      return jsonResponse({ status: true, message: 'StrategicApproachController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'strategicapproach', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await StrategicApproach.update(id, body);
      return jsonResponse({ status: true, message: 'StrategicApproachController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await StrategicApproach.delete(id);
    return jsonResponse({ status: success, message: success ? 'StrategicApproachController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }

  static async getStrategicApproaches(req) {
    const citySlug = req ? new URL(req.url, 'http://localhost').searchParams.get('city_slug') : null;
    const { getStrategicApproaches } = await import('./cityController.js');
    return getStrategicApproaches(citySlug);
  }
}

export default StrategicApproachController;
