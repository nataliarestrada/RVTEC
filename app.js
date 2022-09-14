const express = require('express')
const nunjucks = require('nunjucks')
const { port, secret } = require("./config");
// const userRoutes = require("./routes/usuarios.js")
const path = require("path")
const session = require("express-session");
const addSession = require("./middlewares/addSession");


/*---------Routes Imports---------*/
//const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// function views(document){
//     return path.join(__dirname,"views",document)
// }

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

// app.use(userRoutes)
/*---------Using Routes---------*/
//app.use(userRoutes);
app.use(authRoutes);

nunjucks.configure('views', {
    autoescape: true,
    express: app
});




app.listen(4000,() => {
    console.log("Funcionando... http://localhost:4000")
})