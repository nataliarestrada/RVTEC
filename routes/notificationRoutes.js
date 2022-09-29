const express = require("express")
const NotificationController = require("../controllers/notificationController")


const router = express.Router()
const notificationController = new NotificationController()

router.get("/mostrar-notificaciones", notificationController.getNotificacionesView)
router.get("/resend-notification/:idNotification", notificationController.resendNotification)

module.exports = router






