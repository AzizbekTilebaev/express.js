const jsonwebtoken = require("jsonwebtoken")
const secret = "SecretKey"

const user = {
    id: 1,
    email: "aziz@gmail.com",
    password: "admin1234"
}

class authService {
    async login(req, res) {
        return new Promise((resolve, reject) => {
            try {
                const token = jsonwebtoken.sign(user, secret, {expiresIn: "1h"})


                console.log(req.body);
                resolve({status: "success", message: "succes", data: {...req.body, token}})
            } catch (error) {
                console.log(error)
                reject(error)
            }
        })

    }

    logout(req, res) {}
}

module.exports = new authService();