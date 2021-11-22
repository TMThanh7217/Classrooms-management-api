// classroom router

const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const assignmentController = require('../assignments/assignmentController')
const classroomController = require('./classroomController');
const user_classroomController = require('../user_classrooms/user_classroomController');

/* List all classes  */
//router.get('/listAll', classroomController.listAllClassroom);
router.get('/', passport.authenticate('jwt', { session: false }), classroomController.listAllClassroomWithUserID);

// get All assignments of classroom
router.get('/:classroomId/assignments', passport.authenticate('jwt', { session: false }), assignmentController.getAssignmentWithClassroomID)

/* Classroom detail */
//router.get('/:id', classroomController.getClassroomDetailWithID);
router.get('/:id', passport.authenticate('jwt', { session: false }), classroomController.getUserListWithClassroomID);

router.post('/:id/userCode', user_classroomController.updateUserCode)

router.get('/invite/:inviteLink', classroomController.getClassroomDetailWithInviteLink);

router.post('/invite/join', user_classroomController.createWithRole);

/* Add a new class */
router.post('/', passport.authenticate('jwt', { session: false }), classroomController.create);


module.exports = router;