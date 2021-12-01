const Sequelize = require("sequelize")
const Category = require("../categories/Category")//importado para se comunicar com a tabela de artigos
const connection = require("../database/database")

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) // 1:N - Category têm vários Articles
Article.belongsTo(Category) //1:1 - article pertence a category

// Article.sync({force: true}) - Só executa uma vez para criar a tabela

module.exports = Article