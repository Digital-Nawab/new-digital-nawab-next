import { Seo_Optimization } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class SeoOptimizationController {
  static async index() {
    const data = await Seo_Optimization.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await Seo_Optimization.find(id);
    if (!data) return errorResponse('SeoOptimizationController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/seooptimization
          body[k] = await saveUploadedFile(v, 'seooptimization', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await Seo_Optimization.create(body);
      return jsonResponse({ status: true, message: 'SeoOptimizationController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'seooptimization', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await Seo_Optimization.update(id, body);
      return jsonResponse({ status: true, message: 'SeoOptimizationController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await Seo_Optimization.delete(id);
    return jsonResponse({ status: success, message: success ? 'SeoOptimizationController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }
}

export default SeoOptimizationController;
