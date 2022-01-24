//import package yg di perlukan
const router = require('express').Router();
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const controller = require('./controller');


passport.use(new LocalStrategy(controller.localStrategy))
router.post('/register',multer().none(),controller.register);
router.post('/login', multer().none(), controller.login);
router.get('/me',controller.me)
router.post('/logout',controller.logout)
module.exports = router;