var express = require('express');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-help')
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}
  /* GET home page. */
  router.get('/', function (req, res, next) {
    let user = req.session.user
    console.log(user);
    productHelpers.getAllProducts().then((products) => {

      res.render('user/view-products', { products, user })

    })
  });
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/')
    } else {

      res.render('user/login', { "loginErr": req.session.loginErr })
      res.session.loginErr = false
    }
  })
  router.get('/signup', (req, res) => {
    res.render('user/signup')
  })
  router.post('/signup', (req, res) => {
    userHelpers.doSignup(req.body).then((response) => {
      console.log(response)
    })
  })
  router.post('/login', (req, res) => {
    userHelpers.doLogin(req.body).then((response) => {
      if (response.status) {
        req.session.loggedIn = true
        req.session.user = response.user
        res.redirect('/')
      } else {
        req.session.loginErr = true
        res.redirect('/login')
      }
    })
  })
  router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
  })

  router.get('/cart', verifyLogin, (req, res) => {

    res.render('user/cart')
  })
  
module.exports = router;
