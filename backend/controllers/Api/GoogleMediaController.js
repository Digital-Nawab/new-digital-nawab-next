import { Google_Media } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class GoogleMediaController {
  static async index() {
    const data = await Google_Media.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await Google_Media.find(id);
    if (!data) return errorResponse('GoogleMediaController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/googlemedia
          body[k] = await saveUploadedFile(v, 'googlemedia', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await Google_Media.create(body);
      return jsonResponse({ status: true, message: 'GoogleMediaController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'googlemedia', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await Google_Media.update(id, body);
      return jsonResponse({ status: true, message: 'GoogleMediaController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await Google_Media.delete(id);
    return jsonResponse({ status: success, message: success ? 'GoogleMediaController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }
}

export default GoogleMediaController;
