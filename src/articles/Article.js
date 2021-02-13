const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: Sequelize.STRING,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: Sequelize.STRING,
  },
});

Category.hasMany(Article); // 1 to N
Article.belongsTo(Category); // 1 to 1

//Article.sync({ force: true });

module.exports = Article;
