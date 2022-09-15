const Client = require("../models/Client")
const User = require("../models/User")
class ClientController{
    async getRegistrationView(req,res){
        const user = await User.readOne(req.session.idUser)
        return res.render("registrar-cliente.html")
    }

    async signUp(req,res){
        const fecha = Date.now();
        const hoy = new Date(fecha);
        req.body["createDate"] = hoy
        const newClient = new Client(req.body)
        const validation = newClient.validate()

        if(validation.success){
            await newClient.save()
            
            return res.redirect("/home")
        }
        
        return res.render("registrar-cliente.html")
    }

    async getClientsView(req,res){
        const clients = await Client.readAll()
        //console.log(clients);
        return res.render("mostrar-clientes.html",{clients:clients})
    }

    async getClientByDniView(req,res){
        const fecha = Date.now();
        const hoy = new Date(fecha);
        const client = await Client.readByDni(req.body.dni)
        if (client[0]){
            return res.render("registrar-servicio.html",{client: client[0], fecha: hoy} )
        }
        return res.render("registrar-servicio.html",{error: true}, )
        
    }

    async getHistoryView(req,res){
        const clients = await Client.readAll()
        console.log(clients);
        return res.render("historial-clientes.html",{clients:clients})
    }
}

module.exports = ClientController