import { CityFaq } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class CityFaqController {
  static async index() {
    const data = await CityFaq.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await CityFaq.find(id);
    if (!data) return errorResponse('CityFaqController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/cityfaq
          body[k] = await saveUploadedFile(v, 'cityfaq', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await CityFaq.create(body);
      return jsonResponse({ status: true, message: 'CityFaqController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'cityfaq', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await CityFaq.update(id, body);
      return jsonResponse({ status: true, message: 'CityFaqController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await CityFaq.delete(id);
    return jsonResponse({ status: success, message: success ? 'CityFaqController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }

  static async getCityFaqs(req) {
    const citySlug = req ? new URL(req.url, 'http://localhost').searchParams.get('city_slug') : null;
    const { getCityFaqs } = await import('./cityController.js');
    return getCityFaqs(citySlug);
  }
}

export default CityFaqController;
