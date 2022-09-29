const {query,insert} = require("../config/database")

class Notification{
    idNotification
    constructor(notification){
        this.idService = notification.idService
        this.message = notification.message
        this.datetime = notification.datetime
    }

 //El metodo puede ser utilizado sin crear una instancia
    static async readAll(){
        return await query("SELECT notifications.*, services.idState, clients.name, clients.surname, clients.contact, clients.backup, phones.model, phones.marca FROM notifications, services, clients, phones WHERE services.idClient = clients.idClient AND notifications.idService = services.idService AND services.idPhone = phones.idPhone")
    }

    static async readOne(id){
        return await query("SELECT notifications.*, clients.contact FROM notifications, services, clients WHERE services.idClient = clients.idClient AND notifications.idService = services.idService AND idNotification= ?", [id])
    }

    async save(){
    
        const newNotification = await insert("notifications",{
            idService: this.idService,
            message: this.message,
            datetime: this.datetime
        })
    
        this.idNotification = newNotification
        // console.log("En User")
        //console.log(newPhone)
        return this.idNotification
    }

    async update(newNotification){
        try {
            const id = await query("UPDATE notifications SET ? WHERE idNotification = ?" ,[newNotification, this.idNotification])
            
        return id;
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(id){
        await query("DELETE FROM notifications WHERE idNotification = " + id)
    }

    validate(){
        let result = {success: true, errors: []}
        if(!(this.idService && this.message && this.datetime)){
            result.success = false
            result.errors.push("Rellena todos los campos")
        }
        return result
    }
}

module.exports = Notification