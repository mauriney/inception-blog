const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extends: false}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("index")
})



app.listen(8080, () => {
    console.log("Servidor rodando!")
})