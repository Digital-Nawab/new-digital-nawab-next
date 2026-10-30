import { CityTestimonial } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class CityTestimonialController {
  static async index() {
    const data = await CityTestimonial.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await CityTestimonial.find(id);
    if (!data) return errorResponse('CityTestimonialController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/citytestimonial
          body[k] = await saveUploadedFile(v, 'citytestimonial', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await CityTestimonial.create(body);
      return jsonResponse({ status: true, message: 'CityTestimonialController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'citytestimonial', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await CityTestimonial.update(id, body);
      return jsonResponse({ status: true, message: 'CityTestimonialController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await CityTestimonial.delete(id);
    return jsonResponse({ status: success, message: success ? 'CityTestimonialController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }

  static async getCityTestimonials(req) {
    const citySlug = req ? new URL(req.url, 'http://localhost').searchParams.get('city_slug') : null;
    const { getCityTestimonials } = await import('./cityController.js');
    return getCityTestimonials(citySlug);
  }
}

export default CityTestimonialController;
