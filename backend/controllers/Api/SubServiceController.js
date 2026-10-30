import { SubService } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class SubServiceController {
  static async index() {
    const data = await SubService.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await SubService.find(id);
    if (!data) return errorResponse('SubServiceController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/subservice
          body[k] = await saveUploadedFile(v, 'subservice', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await SubService.create(body);
      return jsonResponse({ status: true, message: 'SubServiceController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'subservice', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await SubService.update(id, body);
      return jsonResponse({ status: true, message: 'SubServiceController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await SubService.delete(id);
    return jsonResponse({ status: success, message: success ? 'SubServiceController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }

  static async getByServiceId(serviceId) {
    const data = await SubService.where('service_id', serviceId);
    return jsonResponse({ status: true, data });
  }
}

export default SubServiceController;
