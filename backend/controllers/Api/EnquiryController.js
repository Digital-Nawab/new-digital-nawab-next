import { Enquiry } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class EnquiryController {
  static async index() {
    const data = await Enquiry.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await Enquiry.find(id);
    if (!data) return errorResponse('EnquiryController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/enquiry
          body[k] = await saveUploadedFile(v, 'enquiry', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await Enquiry.create(body);
      return jsonResponse({ status: true, message: 'EnquiryController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'enquiry', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await Enquiry.update(id, body);
      return jsonResponse({ status: true, message: 'EnquiryController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await Enquiry.delete(id);
    return jsonResponse({ status: success, message: success ? 'EnquiryController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }

  static async store_front(request) {
    const body = await parseRequestBody(request);
    const { postEnquiry } = await import('./enquiryController.js');
    return postEnquiry(body);
  }

  static async updateStatus(id, request) {
    const body = await parseRequestBody(request);
    const { updateEnquiryStatus } = await import('./enquiryController.js');
    return updateEnquiryStatus(id, body.status);
  }

  static async getStats() {
    const total = await Enquiry.count();
    const newLeads = await Enquiry.count('status', 'new_lead');
    const contacted = await Enquiry.count('status', 'contacted');
    const converted = await Enquiry.count('status', 'converted');
    return jsonResponse({
      status: true,
      stats: { total, newLeads, contacted, converted },
    });
  }
}

export default EnquiryController;
