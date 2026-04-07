const { v4: uuidv4} = require("uuid");
const mysql = require("../utils/mysql.helper");

class log {
    async write(req, info) {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    id: uuidv4(),
                    info: info,
                    method: req.method,
                    endpoint: req.originalUrl,

                }

                const sql = `INSERT INTO logs SET ?`;
                await mysql.query(sql, options);
                resolve("success")
            } catch (error) {
                resolve("failed")
            }
        })

    }
}

module.exports = new log()