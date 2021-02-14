const { resolveInclude } = require('ejs');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./User');

router.get('/admin/users', (req, res) => {
  User.findAll().then((users) => {
    res.render('admin/users/index', {
      users,
    });
  });
});

router.get('/admin/users/create', (req, res) => {
  res.render('admin/users/new');
});

router.post('/users/create', (req, res) => {
  let { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (user == undefined) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);

      User.create({
        email,
        password: hash,
      })
        .then(() => {
          res.redirect('/admin/users');
        })
        .catch((error) => {
          res.redirect('/');
        });
    } else {
      res.redirect('/admin/users/create');
    }
  });
});

router.get('/login', (req, res) => {
  res.render('admin/users/login');
});

router.post('/authenticate', (req, res) => {
  let { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (user != undefined) {
      let corret = bcrypt.compareSync(password, user.password);
      if (corret) {
        req.session.user = {
          id: user.id,
          email: user.email,
        };
        res.redirect('/admin/articles');
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.user = undefined;
  res.redirect('/');
});

module.exports = router;
