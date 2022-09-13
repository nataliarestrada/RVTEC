const {query,insert} = require("../config/database")

class Phone{
    idPhone
    constructor(phone){
        this.marca = phone.marca
        this.model = phone.model
        this.password = phone.password
        this.pin = phone.pin
        this.patron = phone.patron
        this.state = phone.state
    }

 //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT * FROM phones")
    }

    static async readOne(id){
        return await query("SELECT * FROM phones WHERE idPhone= ?", [id])
    }

    async save(){
    
        const newPhone = await insert("phones",{
            marca: this.marca,
            model: this.model,
            password: this.password,
            pin: this.pin,
            patron: this.patron,
            state: this.state
        })
    
        this.idPhone = newPhone
        // console.log("En User")
        // console.log(newUser)
        return this.idPhone
    }

    async update(newPhone){
        try {
            const id = await query("UPDATE phones SET ? WHERE idPhone = ?" ,[newPhone, this.idPhone])
            
        return id;
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(id){
        await query("DELETE FROM phones WHERE idPhone = " + id)
    }

    validate(){
        let result = {success: true, errors: []}
        if(!(this.marca && this.model && this.password && this.pin && this.patron && this.state)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        return result
    }
}

module.exports = Phone