const express = require("express")
const PaymentController = require("../controllers/paymentController")


const router = express.Router()
const paymentController = new PaymentController()


/*---------Registration View---------*/
router.get("/calcular-saldo", paymentController.getRegistrationView)

module.exports = router