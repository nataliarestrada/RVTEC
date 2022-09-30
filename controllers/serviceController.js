const Service = require("../models/Service")
const Client = require("../models/Client")
const User = require("../models/User")
const Phone = require("../models/Phone")
const Payment = require("../models/Payment")
const sendMessage = require("../controllers/messageController")
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
                    date: hoy,
                    typePayment: 1
                }

                const newPayment = new Payment(pay)
                
                const validationPayment = newPayment.validate()
            
                if(validationPayment.success){
                    const payment = await newPayment.save()
                    
                    //return res.redirect("/mostrar-servicios")
                    return res.render("registrar-servicio.html",{msj:"Servicio de Reparacion registrado exitosamente"})

                }

            }
        }
        
        return res.render("registrar-servicio.html",{errors:"Error al registrar"})
    }

    async getServicesView(req,res){
        const services = await Service.readAll()
    
        return res.render("mostrar-servicios.html",{services:services})
    }

    async recordDelivery(req,res){
        //registrar pago
        const fecha = Date.now();
        const hoy = new Date(fecha);
        const pay = {
            idService: req.body.idService,
            cost: req.body.cost,
            date: hoy,
            typePayment: 2
        }
        const newPayment = new Payment(pay)
        const validationPayment = newPayment.validate()

        if(validationPayment.success){
            await newPayment.save()
            
            const service = await Service.readOne(req.body.idService)
            service[0].endDate = hoy
            service[0].idState = 4 //estado ENTREGADO
            const updatedService = new Service(service[0]);
            updatedService.idService = service[0].idService;
            await updatedService.update(updatedService);

            return res.redirect("/mostrar-servicios")
        }

        return res.redirect("/home")
    }

    async putServicesView(req,res){
        const service = await Service.editService(req.params.idService)
        return res.render("editar-servicio.html", {service:service[0]})
    }

    async editService(req,res){

        const phone = {
            idPhone: req.body.idPhone,
            marca: req.body.marca,
            model: req.body.model,
            password: req.body.password,
            pin: req.body.pin,
            patron: req.body.patron,
            state: req.body.state,
        }

        const updatePhone = new Phone(phone);
        updatePhone.idPhone = phone.idPhone;
        await updatePhone.update(updatePhone);

        const service = await Service.readOne(req.params.idService);
        service[0].diagnostic = req.body.diagnostic;
        service[0].costService = parseInt(req.body.costService);
        service[0].idState = parseInt(req.body.stateService);
        service[0].description = req.body.description;

        const updateService = new Service(service[0]);
        updateService.idService = req.params.idService;
        await updateService.update(updateService)
        
        const client = await Client.readOne(service[0].idClient)

        if (req.body.notify) {
            let message
            if (service[0].idState === 1) {
                message = "Tu dispositivo 📱 se encuentra En Proceso de Reparacion 🛠.\n Observacion:" + service[0].description 
            }
            if (service[0].idState === 2) {
                message = "La reparacion de tu dispositivo 📱 se encuentra En Demora ⏰.\n Motivo: " + service[0].description  
            }
            if (service[0].idState === 3) {
                message = "La reparacion de tu dispositivo 📱 ha finalizado, puedes pasar por el local para retirarlo 📦😀. \n Observacion: " + service[0].description  
            }
            await sendMessage(client[0].contact, message, service[0].idService)
        }
        

        return res.redirect("/mostrar-servicios");

    }

}

module.exports = ServiceController