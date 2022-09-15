const express = require("express")
const ClientController = require("../controllers/clientController")


const router = express.Router()
const clientController = new ClientController()


/*---------Registration View---------*/
router.get("/registrar_cliente", clientController.getRegistrationView)
router.post("/registrar_cliente", clientController.signUp)

router.get("/mostrar_clientes", clientController.getClientsView)
router.get("/historial_clientes", clientController.getHistoryView)

router.post("/buscar_cliente", clientController.getClientByDniView)

module.exports = router