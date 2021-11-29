const  Sequelize = require("sequelize")

const connection = new Sequelize('inception_blog', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;