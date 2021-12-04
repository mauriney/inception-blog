const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")

router.get("/admin/articles", (req, res) => {
    // res.send("Rota de Artigos")
    res.render("admin/articles/index")
})

//Rota de novo artigo
router.get("/admin/articles/new", (req,res) => {
    Category.findAll().then(categories => {//lista as categorias na pagina de artigos
        res.render("admin/articles/new", {categories: categories})//renderiza a pagina de novo artigo || {categories renderizada no artigo}
    })
});

//Rota para salvar artigo
router.post("/articles/save", (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles")
    })
})

module.exports = router;