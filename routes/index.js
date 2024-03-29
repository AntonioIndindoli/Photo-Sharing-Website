var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotector').userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');
var db = require('../config/database');

/* GET home page. */
router.get('/', getRecentPosts, function (req, res, next) {
  res.render('index');
});

router.get('/registration', (req, res, next) => {
  res.render("registration");
});

router.get('/login', (req, res, next) => {
  res.render("login");
});


router.use('/postimage', isLoggedIn);

router.get('/postimage', (req, res, next) => {
  res.render("postimage");
});


router.get('/post/:id(\\d+)', getPostById, getCommentsByPostId, (req, res, next) => {
  res.render('imagepost', {  });

});




module.exports = router;
