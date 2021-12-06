const express = require("express")
const router = express.Router()
const Category = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify")

//Rota de lista de artigos
router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{model: Category}]//incluindo na busca o model category que é o mesmo que está na linha 3
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles})
    })
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

router.post("/articles/delete", (req, res) => {
    let id = req.body.id; //recebe do body o id
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id // Delete tudo que tiver o id = ao id passado via json
                }
            }).then(() => {
                res.redirect("/admin/articles")
            })
        } else{
            res.redirect("/admin/articles")
        }
    } else{
        res.redirect("/admin/articles")
    }
})

module.exports = router;