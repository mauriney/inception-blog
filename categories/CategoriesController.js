const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require('slugify');

//Rota para pagina de criação de categoria
router.get("/admin/categories/new",(req,res) => {
    res.render("admin/categories/new")
});

//Rota para salvar uma categoria
router.post("/categories/save", (req, res) => {
    let title = req.body.title; //recebe os dados do formulário
    if(title != undefined) {

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories")
        })

    } else {
        res.redirect("/admin/categories/new")
    }
})

//Rota de lista de categoria
router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories})
    })
})

//Rota para deletar uma categoria da lista
router.post("/categories/delete", (req, res) => {
    let id = req.body.id; //recebe do body o id
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id // Delete tudo que tiver o id = ao id passado via json
                }
            }).then(() => {
                res.redirect("/admin/categories")
            })
        } else{
            res.redirect("/admin/categories")
        }
    } else{
        res.redirect("/admin/categories")
    }
})

//Rota para editar categoria
router.get("/admin/categories/edit/:id", (req, res) => {
    let id = req.params.id
    if(isNaN(id)){//Verifica se o id na url é um numero, caso não redireciona para lista
        res.redirect("/admin/categories")
    }

    Category.findByPk(id).then(category => {//findByPk -> é um método que procura pela ChaveId(pk), mas só é útil se vc já souber qual vai ser a PK utilizada 
        if(category != undefined){
            res.render("admin/categories/edit", {category: category})
        }else {
            res.redirect("/admin/categories")
        }
    }).catch(erro => {
        res.redirect("/admin/categories")
    })
})

//Rota para atualizar a categoria editada
router.post("/categories/update", (req, res) => {
    let id = req.body.id
    let title = req.body.title

    Category.update({title: title, slug: slugify(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories")
    })
})

module.exports = router;