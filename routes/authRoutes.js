const express = require("express")
const AuthController = require("../controllers/authController")


const router = express.Router()
const authController = new AuthController()
/*---------Home View---------*/
router.get("/", authController.getWelcomeView)
router.get("/home", authController.getHomeView)
  
/*---------Login View---------*/
router.get("/login-first",authController.getLoginFirstView)
router.get("/login",authController.getLoginView)
router.post("/login",authController.login)

/*---------Logut---------*/
router.get("/logout",authController.logOut)

/*---------Registration View---------*/
router.get("/registrar", authController.getRegistrationView)
router.post("/registrar", authController.signUp)


module.exports = router