const response = require("../utils/response.helper")
const jwt = require("jsonwebtoken")
const secret = "SecretKey"


const auth = async (req, res, next) => {


    try {
            const token = req.header("Authorization")?.split(" ").pop().trim() || null;
            console.log(token)

            if (!token) return response.unauthorized(res, "Unauthorized")
                const user = jwt.verify(token, secret)
            req.user = user;
            next()
            console.log(user)
    } catch (error) {
        console.log(error)
        return response.unauthorized(res, "Avtorizatsyadat otin")
    }

}

module.exports = auth;