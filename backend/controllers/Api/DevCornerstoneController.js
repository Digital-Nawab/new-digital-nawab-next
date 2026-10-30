import { Dev_Cornerstone } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class DevCornerstoneController {
  static async index() {
    const data = await Dev_Cornerstone.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await Dev_Cornerstone.find(id);
    if (!data) return errorResponse('DevCornerstoneController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/devcornerstone
          body[k] = await saveUploadedFile(v, 'devcornerstone', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await Dev_Cornerstone.create(body);
      return jsonResponse({ status: true, message: 'DevCornerstoneController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'devcornerstone', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await Dev_Cornerstone.update(id, body);
      return jsonResponse({ status: true, message: 'DevCornerstoneController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await Dev_Cornerstone.delete(id);
    return jsonResponse({ status: success, message: success ? 'DevCornerstoneController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }
}

export default DevCornerstoneController;
