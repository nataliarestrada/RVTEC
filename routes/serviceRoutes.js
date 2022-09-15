const express = require("express")
const ServiceController = require("../controllers/serviceController")


const router = express.Router()
const serviceController = new ServiceController()


/*---------Registration View---------*/
router.get("/registrar-servicio", serviceController.getRegistrationView)
router.post("/registrar-servicio", serviceController.registerService)

router.get("/mostrar-servicios", serviceController.getServicesView)
//router.get("/historial_clientes", clientController.getHistoryView)

module.exports = router