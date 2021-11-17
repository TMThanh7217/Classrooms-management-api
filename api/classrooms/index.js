// classroom router

const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const classroomController = require('./classroomController');

/* List all classes  */
//router.get('/', classroomController.listAllClassroom);
router.get('/', passport.authenticate('jwt', { session: false }), classroomController.listAllClassroomWithUserID);

/* Classroom detail */
//router.get('/:id', classroomController.getClassroomDetailWithID);
router.get('/:id', passport.authenticate('jwt', { session: false }), classroomController.getUserListWithClassroomID);

router.get('/invite/:inviteLink', classroomController.getClassroomDetailWithInviteLink);

/* Add a new class */
router.post('/', passport.authenticate('jwt', { session: false }), classroomController.create);

module.exports = router;