const Service = require("../models/Service")
const Client = require("../models/Client")
const User = require("../models/User")
const Phone = require("../models/Phone")
class ServiceController{
    
    async getRegistrationView(req,res){
        const fecha = Date.now();
        const hoy = new Date(fecha);
        return res.render("registrar-servicio.html", {fecha: hoy})
    }

    async registerService(req,res){
        const p = {
            marca: req.body.marca,
            model: req.body.model,
            pin:  req.body.pin == ""? null:req.body.pin,
            patron: req.body.patron == ""? null:req.body.patron,
            state: req.body.state
        }
        
        console.log(p);
        const newPhone = new Phone(req.body)
        const validationPhone = newPhone.validate()

        if(validationPhone.success){
            const phone = await newPhone.save()
            console.log(phone);
        }

        /* const newService = new Service(req.body) 
        const validationService = newService.validate()

        if(validationService.success){
            await newService.save()
            
            return res.redirect("/home")
        } */
        const fecha = Date.now();
        const hoy = new Date(fecha);
        return res.render("registrar-servicio.html", {fecha: hoy})
    }

    async getServicesView(req,res){
        const services = await Service.readAll()
        return res.render("mostrar-servicios.html",{services:services})
    }

}

module.exports = ServiceController