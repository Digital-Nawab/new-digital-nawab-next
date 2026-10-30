import { jsonResponse } from '../../utils/api-helpers.js';
import { User } from "../../models/index.js";

export class VerifyEmailController {
    static async invoke(req, { params }) {
        try {
            const resolvedParams = await params;
            const id = resolvedParams?.id;
            if (id) {
                await User.update(id, { email_verified_at: new Date() });
            }
            return jsonResponse({ message: "Email verified successfully", verified: true });
        } catch (error) {
            return jsonResponse({ error: error.message }, 500);
        }
    }
}

export default VerifyEmailController;
