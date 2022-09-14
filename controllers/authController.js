const User = require("../models/User")
class AuthController{

    async getWelcomeView(req, res){
        const data = await User.readAll();
        if (data[0]) {
            return res.render("login.html")
        }
        else {
            return res.render("bienvenida.html")
        }
    }

    async getHomeView(req, res){
        const user = await User.readOne(req.session.idUser)
        return res.render("home.html", {name: user[0].name, surname: user[0].surname})
    }

    getLoginView(req,res){

        return res.render("login.html")
    }

    getRegistrationView(req,res){
        return res.render("registrar.html")
    }

    async login(req, res){
        const userCredential = req.body
        const user = await User.readByEmail(userCredential.email)
        if(user.length === 0){
            return res.render("login.html")
        }
        if(user[0].password !== userCredential.password){
            return res.render("login.html")
        }    
       
        req.session.loggedIn = true
        req.session.idUser = user[0].idUser
        return res.redirect("/home")
    
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }
    
    async signUp(req,res){
        console.log(req.body);
        const newUser = new User(req.body)
        const validation = newUser.validate()

        if(validation.success){
            await newUser.save()
            
            return res.redirect("/login")
        }
        
        return res.render("registrar.html")
    }

     
}

module.exports = AuthController