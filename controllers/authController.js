const User = require("../models/User")
class AuthController{

    async getWelcomeView(req, res){
        const data = await User.readAll();
        if (data[0]) {

            return res.render("login.html",{success:true})
        }
        else {
            return res.render("bienvenida.html")
        }
    }

    async getHomeView(req, res){
        //const user = await User.readOne(req.session.idUser)
        return res.render("home.html")
    }

    getLoginView(req,res){

        return res.render("login.html",{success:true})
    }
    getLoginFirstView(req,res){
        const msj="Usuario registrado correctamente"
        return res.render("login.html",{msj:msj, success:true})
    }

    getRegistrationView(req,res){
        return res.render("registrar.html",{success:true})
    }

    async login(req, res){
        const userCredential = req.body
        const user = await User.readByEmail(userCredential.email)
        if(user.length === 0){
            return res.render("login.html",{success:false, errors:"Credenciales incorrectas"})
        }
        if(user[0].password !== userCredential.password){
            return res.render("login.html",{success:false, errors:"Credenciales incorrectas"})
        }    
       
        req.session.loggedIn = true
        req.session.idUser = user[0].idUser
        req.session.name = user[0].name
        req.session.surname = user[0].surname
        return res.redirect("/home")
    
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }
    
    async signUp(req,res){
        //console.log(req.body);
        const newUser = new User(req.body)
        const validation = newUser.validate()

        if(validation.success){
            await newUser.save()

            return res.redirect("/login-first")
        }
        
        return res.render("registrar.html",{success:validation.success, errors:validation.errors[0]})
    }

     
}

module.exports = AuthController