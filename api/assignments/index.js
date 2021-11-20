const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const assignmentController = require('./assignmentController');

router.post('/', passport.authenticate('jwt', { session: false }), assignmentController.create);

router.post('/update', passport.authenticate('jwt', { session: false }), assignmentController.update);

module.exports = router;