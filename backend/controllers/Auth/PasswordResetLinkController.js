import { User } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody } from '../../utils/api-helpers.js';

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

export default PasswordResetLinkController;

