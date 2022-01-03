const express = require('express');
const router = express.Router();
const passport = require('../passport');
const authorization = require('../authorization/classroomAuth');
const sidController = require('./sidController');

router.post("/", passport.authenticate('jwt', { session: false }), authorization.checkAdminRole, sidController.addSID)

module.exports = router;