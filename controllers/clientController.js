const Client = require("../models/Client")
const User = require("../models/User")
class ClientController{
    async getRegistrationView(req,res){
        const user = await User.readOne(req.session.idUser)
        return res.render("registrar-cliente.html",{name: user[0].name, surname: user[0].surname})
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

    async getClientsView(req,res){
        const clients = await Client.readAll()
        //console.log(clients);
        return res.render("mostrar-clientes.html",{clients:clients})
    }

    async getHistoryView(req,res){
        const clients = await Client.readAll()
        console.log(clients);
        return res.render("historial-clientes.html",{clients:clients})
    }
}

module.exports = ClientController