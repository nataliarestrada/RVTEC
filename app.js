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
const serviceRoutes = require("./routes/serviceRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const voucherRoutes = require("./routes/voucherRoutes")
const notificationRoutes = require("./routes/notificationRoutes")

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
app.use(serviceRoutes)
app.use(paymentRoutes)
app.use(voucherRoutes)
app.use(notificationRoutes)

// nunjucks.configure('views', {
//     autoescape: true,
//     express: app
// });
const dateFilter = require('nunjucks-date-filter');

function setUpNunjucks(expressApp) {

  let env = nunjucks.configure('views', {
      autoescape: true,
      express: app
  });

  // note that 'date' is the function name you'll use in the template. As shown in nunjucks-date-filter's readme
  env.addFilter('date', dateFilter);

}

setUpNunjucks();

app.listen(port,() => {
    console.log("Funcionando... http://localhost:"+ port)
})