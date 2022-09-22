const Service = require("../models/Service")
const Client = require("../models/Client")
const User = require("../models/User")
const Phone = require("../models/Phone")
const Payment = require("../models/Payment")
class PaymentController{
    
    // async getRegistrationView(req,res){
    //     return res.render("registrar-entrega-celular.html")
    // }

    async getPaymentsView(req,res){
        const payments = await Payment.readAll()
        return res.render("mostrar-entregas.html", {payments: payments})
    }

}

module.exports = PaymentController