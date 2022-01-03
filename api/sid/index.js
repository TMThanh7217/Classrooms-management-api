const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const authorization = require('../authorization/classroomAuth');
const sidController = require('./sidController');

router.put("/", passport.authenticate('jwt', { session: false }), authorization.checkAdminRole, sidController.updateOrCreateIfNotExist)

module.exports = router;