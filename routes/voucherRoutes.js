const express = require("express")
const VoucherController = require("../controllers/voucherController")


const router = express.Router()
const voucherController = new VoucherController()


router.get("/mostrar-combrobante", voucherController.getComprobanteView)
router.get("/mostrar-combrobante-entrega", voucherController.getComprobanteEView)


module.exports = router