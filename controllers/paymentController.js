const Service = require("../models/Service")
const Client = require("../models/Client")
const User = require("../models/User")
const Phone = require("../models/Phone")
const Payment = require("../models/Payment")
class PaymentController{
    
    async getRegistrationView(req,res){
        return res.render("registrar-entrega-celular.html")
    }


}

module.exports = PaymentController