const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAysnc = require('../utils/catchAysnc');
const User = require('../models/user');
const session = require('express-session');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAysnc(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.login)

router.get('/logout', users.logout);

module.exports = router;
