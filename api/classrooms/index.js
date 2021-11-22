// classroom router

const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const classroomController = require('./classroomController');
const user_classroomController = require('../user_classrooms/user_classroomController');
const assignmentController = require('../assignments/assignmentController');

/* List all classes  */
//router.get('/listAll', classroomController.listAllClassroom);
router.get('/', passport.authenticate('jwt', { session: false }), classroomController.listAllClassroomWithUserID);

/* Classroom detail */
//router.get('/:id', classroomController.getClassroomDetailWithID);
router.get('/:id', passport.authenticate('jwt', { session: false }), classroomController.getUserListWithClassroomID);

/* Add a new class */
router.post('/', passport.authenticate('jwt', { session: false }), classroomController.create);

/* Invite  */
router.get('/invite/:inviteLink', classroomController.getClassroomDetailWithInviteLink);

router.post('/invite/join', user_classroomController.createWithRole);

/* Assignment */
router.get('/:classroomID/assignments', passport.authenticate('jwt', { session: false }), assignmentController.getAssignmentWithClassroomID)

module.exports = router;