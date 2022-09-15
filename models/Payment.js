const {query,insert} = require("../config/database")

class Payment{
    idPayment
    constructor(payment){
        this.idService = payment.idService
        this.cost = payment.cost
        this.date = payment.date
    }

 //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT * FROM payments")
    }

    static async readOne(id){
        return await query("SELECT * FROM payments WHERE idPayment= ?", [id])
    }

    async save(){
    
        const newPayment = await insert("payments",{
            idService: this.idService,
            cost: this.cost,
            date: this.date,
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
        if(!(this.idService && this.cost && this.date)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        return result
    }
}

module.exports = Payment