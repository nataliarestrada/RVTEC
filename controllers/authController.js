const User = require("../models/User")
const Movie = require("../models/Movie")
class AuthController{

/*     async getHomeView(req, resp){
        const movies = (await Movie.readAll()).slice(0,5)
        const trendingMovies = (await Movie.readAllOrderMoreViews()).slice(1,5)
        const topRatedMovies = (await Movie.readAllOrderRating()).slice(1,5)
        return resp.render("home",{formCSS: "css/home.css", documentName: "Home", movies: movies, 
        topRatedMovies: topRatedMovies, trendingMovies:trendingMovies })
        
    } */

    getLoginView(req,res){
        // console.log(req.session)
        return res.render("login",{formCSS: "/css/loginCSS.css", documentName: "Login"})
    }

    getRegistrationView(req,res){
        return res.render("registration",{formCSS: "css/loginCSS.css", documentName: "Registration"})
    }

    async login(req, res){
        const userCredential = req.body
        const user = await User.readByEmail(userCredential.email)
        if(user.length === 0){
            return res.render("login",{
                formCSS: "/css/loginCSS.css",
                validation:{
                errors:["Usuario no registrado"]
            }})
        }
        if(user[0].password !== userCredential.password){
            return res.render("login",{
                formCSS: "css/loginCSS.css",
                validation:{
                errors:["Credenciales icorrectas"]
            }})
        }    
        /*---------Session Info---------*/
        req.session.loggedIn = true
        req.session.idUser = user[0].idUser
        return res.redirect("/")
        
    
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }
    
/*     async signUp(req,res){
        
        const newUser = new User(req.body)
        const validation = newUser.validate()
        console.log(validation)

        if(newUser.email === "admin@admin.com"){
            newUser.typeUser = 1;
        }else{
            newUser.typeUser = 0;
        }

        if(validation.success){
            await newUser.save()
            
            return res.redirect("/")
        }
        
        return res.render("registration",{validation,user:newUser, formCSS: "css/loginCSS.css"})
    } */

     
}

module.exports = AuthController