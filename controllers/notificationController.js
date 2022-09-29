const Service = require("../models/Service")
const Client = require("../models/Client")
const User = require("../models/User")
const Phone = require("../models/Phone")
const Notification = require("../models/Notification")
const sendMessage = require("../controllers/messageController")

class NotificationController{
    

    async getNotificacionesView(req,res){
        const notifications = await Notification.readAll()
        console.log(notifications);
        return res.render("mostrar-notificaciones.html", {notifications})
    }

    async resendNotification(req,res){
        const notification = await Notification.readOne(req.params.idNotification)
        
        if (notification) {
            sendMessage(notification[0].contact, notification[0].message, notification[0].idService)
            return res.redirect("/mostrar-notificaciones")
        }
        return res.render("mostrar-comprobante.html")
    }

}

module.exports = NotificationController