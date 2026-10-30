import { User } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody } from '../../utils/api-helpers.js';
import bcrypt from 'bcryptjs';

export class PasswordResetLinkController {
  static async store(request) {
    const body = await parseRequestBody(request);
    const email = (body.email || '').trim().toLowerCase();
    const users = await User.where('email', email);
    if (!users.length) {
      return errorResponse("We can't find a user with that email address.", 404);
    }
    return jsonResponse({
      status: true,
      message: 'Password reset link sent to your email (simulated).',
    });
  }
}

export class NewPasswordController {
  static async store(request) {
    const body = await parseRequestBody(request);
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';
    const users = await User.where('email', email);
    if (!users.length) {
      return errorResponse("We can't find a user with that email address.", 404);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update(users[0].id, { password: hashedPassword });
    return jsonResponse({ status: true, message: 'Your password has been reset.' });
  }
}

export class PasswordController {
  static async update(id, request) {
    const body = await parseRequestBody(request);
    const password = body.password || '';
    if (!password) {
      return errorResponse('New password is required', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update(id, { password: hashedPassword });
    return jsonResponse({ status: true, message: 'Password updated successfully.' });
  }
}

export default PasswordController;

