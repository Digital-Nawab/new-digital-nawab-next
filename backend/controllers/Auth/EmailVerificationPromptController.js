import { jsonResponse } from '../../utils/api-helpers.js';

export class EmailVerificationPromptController {
    static async invoke(req) {
        return jsonResponse({ status: "verification-prompt", message: "Please verify your email address." });
    }
}

export default EmailVerificationPromptController;
