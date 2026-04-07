const mysql = require("../config/mysql2.config")

class mysql2 {
    async getOne(query, params) {
        const result = await mysql.query(query, params);
        return result ? result[0][0] : null;
    }

    async getUsers(query, params) {
        const result = await mysql.query(query, params);
        return result ? result[0] : null;
    }

    async query(query, params) {
        try {
            const result = await mysql.query(query, params);
            if(result[0].affectedRows) return null; 
            return "failed";            
        } catch (error) {

        }

    }

    async dlt(query, params) {
        try {
            const result = await mysql.query(query, params);
            console.log(result[0].affectedRows)
            if(result[0].affectedRows) 
            return null;
            return "qatelik";
        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = new mysql2();