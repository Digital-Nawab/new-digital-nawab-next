import { User } from '../../models/index.js';
import { jsonResponse, errorResponse, parseRequestBody } from '../../utils/api-helpers.js';
import bcrypt from 'bcryptjs';

export class RegisteredUserController {
  static async store(request) {
    const body = await parseRequestBody(request);
    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!name || !email || !password) {
      return errorResponse('Name, email, and password are required', 400);
    }

    const existing = await User.where('email', email);
    if (existing.length > 0) {
      return errorResponse('The email has already been taken.', 422);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return jsonResponse(
      {
        status: true,
        message: 'Registration successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      201
    );
  }
}

export default RegisteredUserController;

