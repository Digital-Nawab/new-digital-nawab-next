import { Dev_Commerce } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class DevCommerceController {
  static async index() {
    const data = await Dev_Commerce.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await Dev_Commerce.find(id);
    if (!data) return errorResponse('DevCommerceController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/devcommerce
          body[k] = await saveUploadedFile(v, 'devcommerce', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await Dev_Commerce.create(body);
      return jsonResponse({ status: true, message: 'DevCommerceController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'devcommerce', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await Dev_Commerce.update(id, body);
      return jsonResponse({ status: true, message: 'DevCommerceController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await Dev_Commerce.delete(id);
    return jsonResponse({ status: success, message: success ? 'DevCommerceController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }
}

export default DevCommerceController;
