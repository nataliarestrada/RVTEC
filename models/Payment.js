const {query,insert} = require("../config/database")

class Payment{
    idPayment
    constructor(payment){
        this.idService = payment.idService
        this.cost = payment.cost
        this.date = payment.date
        this.typePayment = payment.typePayment
    }

 //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT payments.*, clients.name, clients.surname, phones.marca, phones.model FROM services, clients, phones, payments WHERE clients.idClient=services.idClient AND phones.idPhone=services.idPhone AND payments.idService=services.idService")
    }

    static async readOne(id){
        return await query("SELECT * FROM payments WHERE idPayment= ?", [id])
    }

    async save(){
    
        const newPayment = await insert("payments",{
            idService: this.idService,
            cost: this.cost,
            date: this.date,
            typePayment: this.typePayment
        })
    
        this.idPayment = newPayment
        // console.log("En User")
        //console.log(newPhone)
        return this.idPayment
    }

    async update(newPayment){
        try {
            const id = await query("UPDATE payments SET ? WHERE idPayment = ?" ,[newPayment, this.idPayment])
            
        return id;
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(id){
        await query("DELETE FROM payments WHERE idPayment = " + id)
    }

    validate(){
        let result = {success: true, errors: []}
        if(!(this.idService && this.cost && this.date && this.typePayment)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        return result
    }
}

module.exports = Payment