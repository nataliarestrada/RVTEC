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
        console.log(req.body);
        const newClient = new Client(req.body)
        const validation = newClient.validate()

        if(validation.success){
            await newClient.save()
            
            return res.redirect("/home")
        }
        
        return res.render("registrar-cliente.html")
    }
}

module.exports = ClientController