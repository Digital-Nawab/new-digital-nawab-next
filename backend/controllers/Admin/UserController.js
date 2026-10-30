import { User } from "../../models/index.js";
import bcrypt from "bcryptjs";
import { jsonResponse } from '../../utils/api-helpers.js';

export class AdminUserController {
    static async index(req) {
        try {
            const users = await User.all();
            return jsonResponse({
                data: users.map(u => {
                    const { password, remember_token, ...safe } = u;
                    return safe;
                })
            });
        } catch (error) {
            return jsonResponse({ error: error.message }, 500);
        }
    }

    static async store(req) {
        try {
            const body = await req.json();
            const { name, email, password } = body;
            if (!name || !email || !password) {
                return jsonResponse({ error: "Name, email, and password are required" }, 422);
            }

            const existing = await User.where('email', email);
            if (existing && existing.length > 0) {
                return jsonResponse({ error: "Email already taken" }, 422);
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                created_at: new Date(),
                updated_at: new Date()
            });

            return jsonResponse({ message: "User created successfully", user }, 201);
        } catch (error) {
            return jsonResponse({ error: error.message }, 500);
        }
    }

    static async update(req, { params }) {
        try {
            const resolvedParams = await params;
            const id = resolvedParams.id;
            const body = await req.json();
            const updateData = { updated_at: new Date() };

            if (body.name) updateData.name = body.name;
            if (body.email) updateData.email = body.email;
            if (body.password) {
                updateData.password = await bcrypt.hash(body.password, 10);
            }

            await User.update(id, updateData);
            const user = await User.find(id);
            return jsonResponse({ message: "User updated successfully", user });
        } catch (error) {
            return jsonResponse({ error: error.message }, 500);
        }
    }

    static async destroy(req, { params }) {
        try {
            const resolvedParams = await params;
            const id = resolvedParams.id;
            await User.delete(id);
            return jsonResponse({ message: "User deleted successfully" });
        } catch (error) {
            return jsonResponse({ error: error.message }, 500);
        }
    }
}

export default AdminUserController;
