import { Service } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class ServiceController {
  static async index() {
    const data = await Service.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await Service.find(id);
    if (!data) return errorResponse('ServiceController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/service
          body[k] = await saveUploadedFile(v, 'service', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await Service.create(body);
      return jsonResponse({ status: true, message: 'ServiceController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'service', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await Service.update(id, body);
      return jsonResponse({ status: true, message: 'ServiceController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await Service.delete(id);
    return jsonResponse({ status: success, message: success ? 'ServiceController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }
}

export default ServiceController;
