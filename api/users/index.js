// user router

const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const userController = require('./userController');

// for debugging, delete or comment this later
router.get('/listAll', passport.authenticate('jwt', { session: false }), userController.listAllUser)

module.exports = router;