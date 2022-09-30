const express = require("express")
const VoucherController = require("../controllers/voucherController")


const router = express.Router()
const voucherController = new VoucherController()


router.get("/mostrar-comprobante", voucherController.getComprobanteView)
router.get("/mostrar-comprobante-entrega", voucherController.getComprobanteEView)

router.get("/generar-comprobante-recepcion/:idService", voucherController.registrarComprobanteRecepcion)
router.get("/generar-comprobante-entrega/:idService", voucherController.registrarComprobanteEntrega)

//pdf
router.get("/ver-comprobante", voucherController.getViewVoucher)

//informes
router.get("/informe-celulares", voucherController.getICelularView)
router.get("/informe-clientes", voucherController.getIClienteView)
router.get("/informe-pagos", voucherController.getIPagoView)
module.exports = router