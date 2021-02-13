const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Article = require('./articles/Article');
const Category = require('./categories/Category');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res) => {
  Article.findAll().then((articles) => {
    res.render('index', {
      articles,
    });
  });
});

app.listen(8080, () => {
  console.log('Running on port:8080');
});
