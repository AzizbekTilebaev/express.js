const validate = require("../utils/validate.helper");

class userValidation {
    // 1. Yangi foydalanuvchi yaratishni tekshirish
    async createUser(req, res, next) {
        const schema = {
            type: "object",
            properties: {
                name: { type: "string", minLength: 3, maxLength: 32 },
                brithday: { type: "string", format: "date" },
                email: { type: "string", format: "email" }
            },
            required: ["name", "brithday", "email"],
            additionalProperties: false,
            errorMessage: {
                type: "Ma'lumot obyekt bo'lishi kerak",
                additionalProperties: "Ortiqcha ma'lumotlar kiritish mumkin emas"
            }
        };

        const result = validate(schema, req.body);
        if (result) return res.status(400).json({ message: result });
        next();
    }

    // 2. ID bo'yicha olishni tekshirish (UUID v4 uchun)
    async getById(req, res, next) {
        const schema = {
            type: "object",
            properties: {
                // Agar helperingizda ajv-formats bo'lsa shunchaki format: "uuid" yozasiz
                // Agar bo'lmasa, pattern (regex) ishlatamiz:
                id: { 
                    type: "string", 
                    pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$" 
                }
            },
            required: ["id"],
            additionalProperties: false,
            errorMessage: {
                properties: {
                    id: "ID noto'g'ri formatda (UUID v4 bo'lishi shart)"
                }
            }
        };

        // DIQQAT: ID odatda req.params ichida bo'ladi
        const result = validate(schema, req.params);
        if (result) return res.status(400).json({ message: result });
        next();
    }
}

module.exports = new userValidation();
