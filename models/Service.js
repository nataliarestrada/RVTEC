const {query,insert} = require("../config/database")

class Service{
    idService
    constructor(service){
        this.diagnostic = service.diagnostic
        this.startDate = service.startDate
        this.estimateDate = service.estimateDate
        this.endDate = service.endDate
        this.state = service.state
        this.description = service.description
        this.idUser = service.idUser
        this.idPhone = service.idPhone
        this.idClient = service.idClient
    }

 //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT * FROM services")
    }

    static async readOne(id){
        return await query("SELECT * FROM services WHERE idService = ?", [id])
    }

    async save(){
    
        const newService = await insert("services",{
            diagnostic: this.diagnostic,
            startDate: this.startDate,
            estimateDate: this.estimateDate,
            endDate: this.endDate,
            state: this.state,
            description: this.description,
            idUser: this.idUser,
            idPhone: this.idPhone,
            idClient: this.idClient
        })
    
        this.idService = newService
        // console.log("En User")
        // console.log(newUser)
        return this.idService
    }

    async update(newService){
        try {
            const id = await query("UPDATE services SET ? WHERE idService = ?" ,[newService, this.idService])
            
        return id;
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(id){
        await query("DELETE FROM services WHERE idService = " + id)
    }

    validate(){
        let result = {success: true, errors: []}
        if(!(this.diagnostic && this.startDate && this.estimateDate && this.state && this.description && this.idUser && this.idPhone && this.idClient)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        return result
    }
}

module.exports = Phone