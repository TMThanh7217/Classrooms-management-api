const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const authorization = require('../authorization/classroomAuth');
const notificationController = require('./notificationController');

router.get('/:classroomID', passport.authenticate('jwt', { session: false }), notificationController.notiAll);

module.exports = router;