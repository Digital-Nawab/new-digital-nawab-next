import { Package_Feature } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class PackageFeatureController {
  static async index() {
    const data = await Package_Feature.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await Package_Feature.find(id);
    if (!data) return errorResponse('PackageFeatureController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/packagefeature
          body[k] = await saveUploadedFile(v, 'packagefeature', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await Package_Feature.create(body);
      return jsonResponse({ status: true, message: 'PackageFeatureController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'packagefeature', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await Package_Feature.update(id, body);
      return jsonResponse({ status: true, message: 'PackageFeatureController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await Package_Feature.delete(id);
    return jsonResponse({ status: success, message: success ? 'PackageFeatureController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }
}

export default PackageFeatureController;
