const express = require("express")
const ServiceController = require("../controllers/serviceController")


const router = express.Router()
const serviceController = new ServiceController()


/*---------Registration View---------*/
router.get("/registrar-servicio", serviceController.getRegistrationView)
router.post("/registrar-servicio", serviceController.registerService)
router.post("/buscar-servicio", serviceController.searchService)
router.get("/mostrar-servicios", serviceController.getServicesView)
router.post("/registrar-entrega", serviceController.recordDelivery)
router.get("/editar-servicio/:idService", serviceController.putServicesView)
router.post("/editar-servicio/:idService", serviceController.editService)



module.exports = router