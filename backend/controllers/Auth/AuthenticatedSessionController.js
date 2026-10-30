import { User } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody } from '../../utils/api-helpers.js';
import bcrypt from 'bcryptjs';

export class AuthenticatedSessionController {
  static async store(request) {
    const body = await parseRequestBody(request);
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!email || !password) {
      return errorResponse('Email and password are required', 400);
    }

    const users = await User.where('email', email);
    if (!users.length) {
      return errorResponse('These credentials do not match our records.', 401);
    }

    const user = users[0];
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch {
      isMatch = user.password === password;
    }

    if (!isMatch && user.password !== password) {
      return errorResponse('These credentials do not match our records.', 401);
    }

    return jsonResponse({
      status: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }

  static async destroy() {
    return jsonResponse({ status: true, message: 'Logged out successfully' });
  }
}

export default AuthenticatedSessionController;

