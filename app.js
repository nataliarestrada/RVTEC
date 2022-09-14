const express = require('express')
const nunjucks = require('nunjucks')
const { port, secret } = require("./config")
const path = require("path")
const session = require("express-session")
const addSession = require("./middlewares/addSession")


/*---------Routes Imports---------*/
//const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const clientRoutes = require("./routes/clientRoutes")

const app = express()


app.use(express.static(path.join(__dirname,"static")))
app.use(express.json())
// app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.use(
    session({
      secret: secret, //Cookie Encoder
      resave: false, //Dont send cookie every time
      saveUninitialized: false,
    })
  );
app.use(addSession);


/*---------Using Routes---------*/
//app.use(userRoutes);
app.use(authRoutes)
app.use(clientRoutes)

nunjucks.configure('views', {
    autoescape: true,
    express: app
});


app.listen(port,() => {
    console.log("Funcionando... http://localhost:"+ port)
})