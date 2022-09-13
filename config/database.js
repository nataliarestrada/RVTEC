const mysql = require('mysql2')
const { dbName, dbUser, dbPassword, dbPort, dbHost } = require(".")

const connection = mysql.createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName
 })

 function query(sql, data){
    return new Promise((resolve, reject) => {
        connection.query(sql, data, (error, result) => {
            // Error first callback
            if (error){
                reject(error.sqlMessage)
            }
            else{
                resolve(result)
            }
        })
    })
}

async function insert(tableName, data){
    try{
        await query(`INSERT INTO ${tableName}(??) VALUES(?)`,[Object.keys(data), Object.values(data)])
        return {data, success:true}
    }catch(error){
        return {error, success:false}
    }
}
//No podemos usar delete: palabra reservada
async function del(tableName, data){
    try{
        await query(`DELETE FROM ${tableName} WHERE id=?`,[data])
        return {data, success:true}
    }catch(error){
        return {error, success:false}
    }
}

async function update(tableName, data, id){
    console.log(data);
    try{
        await query(`UPDATE ${tableName} SET ? WHERE id=?`,[data, id])
        return {data, success:true}
    }catch(error){
        return {error, success:false}
    }
}
// Exportamos un objeto
module.exports = {query, insert, del, update}