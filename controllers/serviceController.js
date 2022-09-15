const Service = require("../models/Service")
const Client = require("../models/Client")
const User = require("../models/User")
class ServiceController{
    
    async getRegistrationView(req,res){
        const user = await User.readOne(req.session.idUser)
        const clients = await Client.readAll()
        return res.render("registrar-servicio.html",{name: user[0].name, surname: user[0].surname})
    }

    async signUp(req,res){
        const fecha = Date.now();
        const hoy = new Date(fecha);
        req.body["createDate"]=hoy
        const newClient = new Client(req.body)
        const validation = newClient.validate()

        if(validation.success){
            await newClient.save()
            
            return res.redirect("/home")
        }
        
        return res.render("registrar-cliente.html")
    }

    async getServicesView(req,res){
        const services = await Service.readAll()
        return res.render("mostrar-servicios.html",{services:services})
    }

}

module.exports = ServiceController