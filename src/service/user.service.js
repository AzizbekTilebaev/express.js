const fs = require("fs")
const path = require("path")
const sharp = require("sharp")
const { v4: uuidv4} = require("uuid")
const crypto = require("crypto");
const mysql = require("../utils/mysql.helper")


class userService {
    async getUsers(req, res) {
        return new Promise(async (resolve, reject) => {
            try {

                // const file = path.join(__dirname, "./data.json")
                // const users = JSON.parse(fs.readFileSync(file, "utf8"))
            // mysql2/promise ishlatayotganimiz uchun [rows] ko'rinishida olamiz
            const users = await mysql.getUsers("SELECT * FROM users"); 
                resolve(users)
            } catch (error) {
                reject(error)
            }
        })
    }

    async getUserById(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                const {id} = req.params;
                const user = await mysql.getOne("SELECT * FROM users WHERE id = ?", [id]);
                resolve(user)
                console.log(user)

            } catch (error) {
                reject(error)
            }
        })
    }

    async createUser(req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                    req.body.id = uuidv4();
                    let sql = "SELECT * FROM users WHERE email = ?";
                    let result = await mysql.getUsers(sql, [req.body.email])

                    if (result) return resolve({res:"badRequest", message: "User aldinnan bar"});

                    const imgInfo = req.file || null;
                    const imagesPath = path.join(__dirname, "../../public", "images")
                    if (!fs.existsSync(imagesPath)) fs.mkdirSync(imagesPath);
                    const imgFormat = imgInfo.mimetype.split("/").pop();
                    const imgName = `${crypto.randomBytes(7).toString("hex")}.${imgFormat}`

                    sharp(imgInfo.buffer).toFile(`${imagesPath}/${imgName}`)
                    console.log(imgInfo, imgFormat, imgName)


                    sql = `INSERT INTO users SET ?`;
                    await mysql.query(sql, {...req.body, img: imgName});

                    // sql = `INSERT INTO users (name, brithday, email, img) VALUES (?, ?, ?, ?)`;
                    // await mysql.execute(sql, [
                    //     req.body.name,
                    //     req.body.brithday,
                    //     req.body.email,
                    //     imgName,
                    // ]);
                    resolve({res: "created",message: "user jaratild"})
            } catch (error) {
                reject(error)
            }

        })

    }
    async updateUser(req, res) {
        return new Promise (async (resolve, reject) => {
            const {id} = req.params;
            const {name} = req.body;            
            const rsl = await mysql.query("UPDATE users SET name = ? WHERE id = ?", [name, id]);
            resolve({message: rsl})
        })
    }

    async deleteUser(req, res) {
            return new Promise (async (resolve, reject) => {
                try {
                    const {id} = req.params;
                    const rsl = await mysql.dlt("DELETE FROM users WHERE id = ?", [id]);
                    console.log(rsl)

                    resolve({message: rsl})                    
                } catch (error) {
                    reject(error)
                    
                }

            })
       
    }


}

module.exports = new userService();