const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

const Article = require("./articles/Article")
const Category = require("./categories/Category")

app.set('view engine', 'ejs')

// Static
app.use(express.static('public'))

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())
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
app.use("/",categoriesController)
//Informando que vai utilizar a rota de ArticlesController
app.use("/",articlesController)

//Renderizando a homepage
app.get("/", (req, res) => {
    Article.findAll({
        order:[
            ['id', 'DESC']
        ]
    }).then(articles => { //Pesquisa todos os artigos
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories}) //Renderiza os artigos e categoria na index
        })
    })
})

//Busca por slug na index de articles
app.get("/:slug", (req, res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories}) //Renderiza os artigos e categoria na article
            })
        } else{
            res.redirect("/")
        }
    }).catch( err => {
        res.redirect("/")
    })
})

//Rota para pesquisar categoria usando o slug - na navbarhome
app.get("/category/:slug", (req, res) => {
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}] //quando buscar categoria inclui tudo de article
    }).then( category => {
        if(category != undefined){

            Category.findAll().then(categories => {
                res.render("index",{articles: category.articles,categories: categories})
            })

        }else{
            res.redirect("/")
        }
    }).catch( err => {
        res.redirect("/")
    })
})


app.listen(8080, () => {
    console.log("Servidor rodando!")
})