const Service = require("../models/Service")
const Client = require("../models/Client")
const User = require("../models/User")
const Phone = require("../models/Phone")
const Voucher = require("../models/Voucher")
class VoucherController{
    

    getComprobanteEView(req,res){
        return res.render("mostrar-comprobante-entrega.html")
    }

    getComprobanteView(req,res){
        return res.render("mostrar-comprobante.html")
    }
    
    async getVouchersView(req,res){
        const vouchers = await Voucher.readAll()
        return res.render("mostrar-entregas.html", {vouchers: vouchers})
    }



}

module.exports = VoucherController