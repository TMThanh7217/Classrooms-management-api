// user router

const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const userController = require('./userController');
const user_classroomController = require('../user_classrooms/user_classroomController');

// profile page
router.get('/:userId', passport.authenticate('jwt', { session: false }), userController.info);

// for debugging, delete or comment this later
router.get('/listAll', userController.listAllUser);

// uh oh another pain to fix
router.get('/:userId/classrooms', user_classroomController.findClassroomsOfUserHasRole);

module.exports = router;