import { Graphics_logo } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody, saveUploadedFile } from '../../utils/api-helpers.js';

export class GraphicsLogoController {
  static async index() {
    const data = await Graphics_logo.all();
    return jsonResponse({ status: true, data });
  }

  static async show(id) {
    const data = await Graphics_logo.find(id);
    if (!data) return errorResponse('GraphicsLogoController record not found', 404);
    return jsonResponse({ status: true, data });
  }

  static async store(request) {
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [k, v] of formData.entries()) {
        if (typeof v === 'object' && v && v.name) {
          // Photos from admin saved in public/admin-assets/images/graphicslogo
          body[k] = await saveUploadedFile(v, 'graphicslogo', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const created = await Graphics_logo.create(body);
      return jsonResponse({ status: true, message: 'GraphicsLogoController created successfully', data: created }, 201);
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
          body[k] = await saveUploadedFile(v, 'graphicslogo', 'admin-assets');
        } else {
          body[k] = v;
        }
      }
    } else {
      body = await parseRequestBody(request);
    }

    try {
      const updated = await Graphics_logo.update(id, body);
      return jsonResponse({ status: true, message: 'GraphicsLogoController updated successfully', data: updated });
    } catch (err) {
      return errorResponse(err.message, 400);
    }
  }

  static async destroy(id) {
    const success = await Graphics_logo.delete(id);
    return jsonResponse({ status: success, message: success ? 'GraphicsLogoController deleted successfully' : 'Not found' });
  }

  static async delete(id) {
    return this.destroy(id);
  }
}

export default GraphicsLogoController;
