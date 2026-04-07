const userService = require("../service/user.service")
const response = require("../utils/response.helper")
const dbErrorHelper = require("../utils/db_errors.helper");
const log = require("../service/logs.service")

class userController {
    async getUsers(req, res) {
        try {
            const users = await userService.getUsers(req, res);
            await response.success(res, "Barliq uerler", users)
            //res.status(200).json(users)
        } catch (error) {
            await log.write(req, error)
            res.status(500).json({massage: "serverde qatelik"})
        }        
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req, res);
            await response.success(res, "User magliwmatlari", user)
        } catch (error) {
            
        }
    }

    async createUser(req, res) {
       try {
            const user = await userService.createUser(req, res);
            await response[user.res](res, user.message, user?.data);
            //res.status(200).json(users)

        } catch (error) {
            console.log(error)
            await log.write(req, error)
            res.status(500).json({massage: "Serverde qatelik"})
        }
        
    }

    async updateUser(req, res) {
        try {
            const update = await userService.updateUser(req, res);
            await response.updateUser(res, update.message)
        } catch (error) {
            
        }
    }

    async deleteUser(req, res) {
        try {
            const dlt = await userService.deleteUser(req, res);
            console.log(dlt)
            await response.deleteUser(res, dlt.message)
        } catch (error) {
            const friendlyMessage = dbErrorHelper(error);
            console.error("LOG:", error.code); 
            
            // 'response' (helper) emas, 'res' (Express obyekti) ishlatiladi:
            return res.status(400).json({ 
                status: 400,
                message: friendlyMessage,
            });
        }

    }


}

module.exports = new userController();