const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")

app.set('view engine', 'ejs')

// Static
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// app.use(express.urlencoded({extends: false}))
// app.use(express.json())


//Database
connection
    .authenticate()
    .then(() => {
        console.log("conexão realizada com sucesso!")
    }).catch((error) => {
        console.log(error)
    })

app.get("/", (req, res) => {
    res.render("index")
})



app.listen(8080, () => {
    console.log("Servidor rodando!")
})