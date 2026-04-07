const authService = require("../service/auth.servis");
const response = require("../utils/response.helper")

class authController {
    async login(req, res) {
        try {
            const result = await authService.login(req, res);
            response[result.status](res, result.message, result.data)
        } catch (error) {
            return response.internalServerError(res, error.message);
        }
    }

    logout(req, res) {}

    async register(req, res) {}
}

module.exports = new authController();