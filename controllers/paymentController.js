const Payment = require("../models/Payment")
class PaymentController{

    async getPaymentsView(req,res){
        const payments = await Payment.readAll()
        return res.render("mostrar-entregas.html", {payments: payments})
    }

}

module.exports = PaymentController