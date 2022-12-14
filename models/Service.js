const {query,insert} = require("../config/database")

class Service{
    idService
    constructor(service){
        this.diagnostic = service.diagnostic
        this.startDate = service.startDate
        this.estimateDate = service.estimateDate
        this.endDate = service.endDate
        this.idState = service.idState
        this.description = service.description
        this.costService = service.costService
        this.idUser = service.idUser
        this.idPhone = service.idPhone
        this.idClient = service.idClient
    }

 //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT services.*, clients.name, clients.surname, phones.marca, phones.model, phones.state, SUM(payments.cost) AS 'cost', (services.costService - SUM(payments.cost)) AS 'saldo' FROM services, clients,phones,payments WHERE clients.idClient=services.idClient AND phones.idPhone=services.idPhone AND payments.idService=services.idService GROUP BY services.idService")
        //return await query("SELECT services.*, clients.name, clients.surname, phones.marca, phones.model, phones.state, SUM(payments.cost) AS 'cost', (services.costService - SUM(payments.cost)) AS 'saldo' FROM services, clients,phones,payments,states WHERE clients.idClient=services.idClient AND phones.idPhone=services.idPhone AND payments.idService=services.idService AND services.idState=states.id GROUP BY services.idService")
    }

    static async search(tabla,col,texto){
        return await query(`SELECT services.*, clients.name, clients.surname, phones.marca, phones.model, phones.state, SUM(payments.cost) AS 'cost', (services.costService - SUM(payments.cost)) AS 'saldo' FROM services, clients,phones,payments,states WHERE clients.idClient=services.idClient AND phones.idPhone=services.idPhone AND payments.idService=services.idService AND services.idState=states.id AND ` + tabla + `.` + col + ` LIKE "%` + texto + `%" GROUP BY services.idService`)
    }

    static async editService(idService){
        return await query("SELECT services.*, clients.*, phones.*, payments.cost FROM services, clients,phones,payments WHERE clients.idClient=services.idClient AND phones.idPhone=services.idPhone AND payments.idService=services.idService AND payments.typePayment=1 AND services.idService = " + idService)
    }

    static async readOne(id){
        return await query("SELECT * FROM services WHERE idService = ?", [id])
    }

    static async delivery(id){
        return await query("UPDATE services SET `idState` = '4' WHERE idService = ?", [id])
    }

    async save(){
    
        const newService = await insert("services",{
            diagnostic: this.diagnostic,
            startDate: this.startDate,
            estimateDate: this.estimateDate,
            endDate: this.endDate,
            idState: this.idState,
            description: this.description,
            costService: this.costService,
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
        if(!(this.diagnostic && this.startDate && this.estimateDate && this.idState && this.idUser && this.idPhone && this.idClient)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        return result
    }
}

module.exports = Service