const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const assignmentController = require('./assignmentController');

// ignore these
router.post('/', passport.authenticate('jwt', { session: false }), assignmentController.create);

router.post('/update', passport.authenticate('jwt', { session: false }), assignmentController.update);

// ignore this
router.get('/total', assignmentController.total);

module.exports = router;