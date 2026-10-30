import { Sm_Benefit } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class SmmBenefitController {
  static async index() {
    const data = await Sm_Benefit.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await Sm_Benefit.find(id);
    if (!data) return errorResponse('SmmBenefitController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/smmbenefit
          body[k] = await saveUploadedFile(v, 'smmbenefit', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await Sm_Benefit.create(body);
      return jsonResponse({ status: true, message: 'SmmBenefitController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'smmbenefit', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await Sm_Benefit.update(id, body);
      return jsonResponse({ status: true, message: 'SmmBenefitController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await Sm_Benefit.delete(id);
    return jsonResponse({ status: success, message: success ? 'SmmBenefitController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }
}

export default SmmBenefitController;
