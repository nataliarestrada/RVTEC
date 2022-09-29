const {query,insert} = require("../config/database")

class Voucher{
    idVoucher
    constructor(voucher){
        this.idService = voucher.idService
        this.type = voucher.type
        this.creatDate = voucher.creatDate
        this.content = voucher.content
    }

 //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT * FROM vouchers")
    }

    static async readOne(id){
        return await query("SELECT * FROM vouchers WHERE idVoucher= ?", [id])
    }

    async save(){
    
        const newVoucher = await insert("vouchers",{
            idService: this.idService,
            type: this.type,
            creatDate: this.creatDate,
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
        if(!(this.idService && this.type && this.creatDate)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        return result
    }
}

module.exports = Voucher