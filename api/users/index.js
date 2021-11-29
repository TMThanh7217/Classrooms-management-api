// user router

const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const userController = require('./userController');
const user_classroomController = require('../user_classrooms/user_classroomController');

// for debugging, delete or comment this later
router.get('/listAll', userController.listAllUser)

router.get('/:userId/classrooms', user_classroomController.getWithUserID);

module.exports = router;