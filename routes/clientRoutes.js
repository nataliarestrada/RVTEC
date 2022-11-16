const express = require("express")
const ClientController = require("../controllers/clientController")


const router = express.Router()
const clientController = new ClientController()


/*---------Registration View---------*/
router.get("/registrar-cliente", clientController.getRegistrationView)
router.post("/registrar-cliente", clientController.signUp)

router.get("/mostrar-clientes", clientController.getClientsView)
router.get("/historial-clientes", clientController.getHistoryView)
router.get("/historial-clientes-asc", clientController.getHistoryViewAsc)
router.post("/buscar-cliente", clientController.getClientByDniView)
router.post("/buscar-dni", clientController.getHistoryViewDni)

module.exports = router