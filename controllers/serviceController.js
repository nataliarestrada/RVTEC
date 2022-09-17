const Service = require("../models/Service")
const Client = require("../models/Client")
const User = require("../models/User")
const Phone = require("../models/Phone")
const Payment = require("../models/Payment")
class ServiceController{
    
    async getRegistrationView(req,res){
        return res.render("registrar-servicio.html")
    }

    async registerService(req,res){
        //client
        const idClient = parseInt(req.body.idClient)

        const p = {
            marca: req.body.marca,
            model: req.body.model,
            password:  req.body.password == ""? null:req.body.password,
            pin:  req.body.pin == ""? null:req.body.pin,
            patron: req.body.patron == ""? null:req.body.patron,
            state: req.body.state
        }
        
        //console.log(p);
        //phone
        const newPhone = new Phone(p)
        const validationPhone = newPhone.validate()

        if(validationPhone.success){
            const phone = await newPhone.save()
            const idPhone = phone.id
            //console.log(phone);

            //service
            const fecha = Date.now();
            const hoy = new Date(fecha);
            const s = {
                diagnostic: req.body.diagnostic,
                startDate: hoy,
                estimateDate: new Date(req.body.estimateDate),
                state: req.body.state,
                idState: parseInt(req.body.idState),
                costService: req.body.costService,
                idUser: req.session.idUser,
                idPhone: idPhone,
                idClient: idClient
            }

            const newService = new Service(s)
            const validationService = newService.validate()
            //console.log(validationService);
            if(validationService.success){
                const service = await newService.save()
                const idService = service.id

                //payment
                const pay = {
                    idService: idService,
                    cost: req.body.cost,
                    date: hoy
                }

                const newPayment = new Payment(pay)
                const validationPayment = newPayment.validate()

                if(validationPayment.success){
                    const payment = await newPayment.save()

                    return res.redirect("/home")

                }

            }
        }
        
        return res.render("registrar-servicio.html")
    }

    async getServicesView(req,res){
        const services = await Service.readAll()
        //console.log(services);
        return res.render("mostrar-servicios.html",{services:services})
    }

    async putServicesView(req,res){
        const services = await Service.readAll()
        //console.log(services);
        return res.render("editar-servicio.html",{services:services})
    }

    //cambiar a otro lado
    getPaymentsView(req,res){
        return res.render("mostrar-entregas.html")
    }

    getComprobanteEView(req,res){
        return res.render("mostrar-comprobante-entrega.html")
    }

    getComprobanteView(req,res){
        return res.render("mostrar-comprobante.html")
    }

    getNotificacionesView(req,res){
        return res.render("mostrar-notificaciones.html")
    }

}

module.exports = ServiceController