const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")

const CategoriesController = require("./categories/CategoriesController")
const ArticlesController = require("./articles/ArticlesController")

app.set('view engine', 'ejs')

// Static
app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))
app.use(express.json())


//Database
connection
    .authenticate()
    .then(() => {
        console.log("conexão realizada com sucesso!")
    }).catch((error) => {
        console.log(error)
    })

//Informando que vai utilizar a rota de CategoriesController
app.use("/", CategoriesController)
//Informando que vai utilizar a rota de ArticlesController
app.use("/", ArticlesController)

app.get("/", (req, res) => {
    res.render("index")
})



app.listen(8080, () => {
    console.log("Servidor rodando!")
})