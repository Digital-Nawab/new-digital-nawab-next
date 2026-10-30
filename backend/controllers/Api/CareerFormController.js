import { CareerForm } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class CareerFormController {
  static async index() {
    const data = await CareerForm.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await CareerForm.find(id);
    if (!data) return errorResponse('CareerFormController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/careerform
          body[k] = await saveUploadedFile(v, 'careerform', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await CareerForm.create(body);
      return jsonResponse({ status: true, message: 'CareerFormController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'careerform', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await CareerForm.update(id, body);
      return jsonResponse({ status: true, message: 'CareerFormController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await CareerForm.delete(id);
    return jsonResponse({ status: success, message: success ? 'CareerFormController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }

  static async storeData(request) {
    const { storeCareerFormData } = await import('./careerFormController.js');
    return storeCareerFormData(request);
  }
}

export default CareerFormController;
