import { jsonResponse } from '../../utils/api-helpers.js';

export class EmailVerificationNotificationController {
    static async store(req) {
        return jsonResponse({ status: "verification-link-sent", message: "Verification link sent to your email." });
    }
}

export default EmailVerificationNotificationController;
