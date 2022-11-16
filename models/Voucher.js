const {query,insert} = require("../config/database")

class Voucher{
    idVoucher
    constructor(voucher){
        this.idService = voucher.idService
        this.type = voucher.type
        this.createDate = voucher.createDate
        this.content = voucher.content
    }

 //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT * FROM vouchers")
    }

    static async readOne(id){
        return await query("SELECT * FROM vouchers WHERE idVoucher= ?", [id])
    }

    static async readPdf(id){
        return await query("SELECT clients.name, clients.surname, clients.email, clients.dni, clients.contact, clients.backup, phones.marca, phones.model, phones.password, phones.pin, phones.patron, phones.state, services.diagnostic, services.startDate, services.estimateDate, services.endDate, services.description, states.description as 'estado', services.costService, payments.cost, vouchers.* FROM services,clients,phones,payments,vouchers,states WHERE clients.idClient=services.idClient AND phones.idPhone=services.idPhone AND services.idState=states.id AND payments.idService=services.idService AND vouchers.idService=services.idService AND payments.typePayment=1 AND vouchers.idVoucher= ?;", [id])
    }

    static async readVoucher(type){
        return await query("SELECT clients.name, clients.surname, phones.marca, phones.model, payments.cost, vouchers.* FROM vouchers, clients, phones, payments, services WHERE vouchers.idService = services.idService AND payments.idService = services.idService AND services.idClient = clients.idClient AND services.idPhone = phones.idPhone AND payments.typePayment = ? AND vouchers.type= ?", [type, type])
    }


    async save(){
    
        const newVoucher = await insert("vouchers",{
            idService: this.idService,
            type: this.type,
            createDate: this.createDate,
            content: this.content,
        })
    
        this.idVoucher = newVoucher
        // console.log("En User")
        //console.log(newPhone)
        return this.idVoucher
    }

    async update(newVoucher){
        try {
            const id = await query("UPDATE vouchers SET ? WHERE idVoucher = ?" ,[newVoucher, this.idVoucher])
            
        return id;
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(id){
        await query("DELETE FROM vouchers WHERE idVoucher = " + id)
    }

    validate(){
        let result = {success: true, errors: []}
        if(!(this.idService && this.type && this.createDate)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        return result
    }
}

module.exports = Voucher