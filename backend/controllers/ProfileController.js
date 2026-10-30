import { User } from '../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody } from '../utils/api-helpers.js';
import bcrypt from 'bcryptjs';

export class ProfileController {
  static async edit(id) {
    const user = await User.find(id);
    if (!user) return errorResponse('User not found', 404);
    return jsonResponse({ status: true, user: { id: user.id, name: user.name, email: user.email } });
  }

  static async update(id, request) {
    const body = await parseRequestBody(request);
    const updates = { name: body.name, email: body.email };
    if (body.password) {
      updates.password = await bcrypt.hash(body.password, 10);
    }
    const updated = await User.update(id, updates);
    return jsonResponse({ status: true, message: 'Profile updated successfully', user: updated });
  }

  static async destroy(id) {
    const success = await User.delete(id);
    return jsonResponse({ status: success, message: success ? 'Account deleted' : 'Not found' });
  }
}

export default ProfileController;

