const validate = require("../utils/validate.helper");

class authValidation {
    async login(req, res, next) {
        const schema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { 
            type: "string", 
            pattern: "^[a-zA-Z0-9]{5,15}$" // {5-15} emas, {5,15} bo'ladi
        }
    },
    required: ["email", "password"], // properties ichidan tashqariga chiqarildi
    additionalProperties: false,    // properties ichidan tashqariga chiqarildi
    errorMessage: {
        type: "Ma'lumot ob'ekt bo'lishi shart",
        required: {
            email: "Email kiritish shart",
            password: "Parol kiritish shart"
        },
        properties: {
            email: "Email formati qate",
            password: "Parol formati qate (5-15 belgidan iborat bo'lsin)"
        },
        // additionalProperties xabari AJV-errors'da odatda '_additionalProperties' deb yoziladi
        additionalProperties: "Qosimsha magliwmatlardi oshirin"
    }
};

        const result = validate(schema, req.body);
        if(result) return res.status(400).json({ message: result});
        next()
    }
}

module.exports = new authValidation();