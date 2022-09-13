const express = require('express')
// const userRoutes = require("./routes/usuarios.js")
// const path = require("path")

const app = express()

// function views(document){
//     return path.join(__dirname,"views",document)
// }

// app.use(express.static(path.join(__dirname,"static")))
// app.use(express.json())
// app.use(express.text())
// app.use(express.urlencoded({extended:true}))

// app.use(userRoutes)

app.get('/',function(req,res){
    res.json({hola:"mundo"})
})

app.listen(4000,() => {
    console.log("Funcionando... http://localhost:4000")
})