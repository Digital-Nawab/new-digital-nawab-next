import { jsonResponse } from '../../utils/api-helpers.js';
import { User } from "../../models/index.js";
import bcrypt from "bcryptjs";

export class ConfirmablePasswordController {
    static async show(req) {
        return jsonResponse({ message: "Confirm password prompt" });
    }

    static async store(req) {
        try {
            const body = await req.json();
            const { email, password } = body;
            const users = await User.where('email', email);
            if (!users || users.length === 0) {
                return jsonResponse({ error: "Invalid credentials" }, 422);
            }
            const match = await bcrypt.compare(password, users[0].password);
            if (!match) {
                return jsonResponse({ error: "Password does not match" }, 422);
            }
            return jsonResponse({ success: true, confirmed_at: Date.now() });
        } catch (error) {
            return jsonResponse({ error: error.message }, 500);
        }
    }
}

export default ConfirmablePasswordController;
