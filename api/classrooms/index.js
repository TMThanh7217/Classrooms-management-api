// classroom router

const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const authorization = require('../authorization/classroomAuth');
const classroomController = require('./classroomController');
const user_classroomController = require('../user_classrooms/user_classroomController');
const assignmentController = require('../assignments/assignmentController');

/* List all classes  */
//router.get('/listAll', classroomController.listAllClassroom);
router.get('/', passport.authenticate('jwt', { session: false }), classroomController.listAllClassroomWithUserID);

/* Classroom detail */
//router.get('/:id', classroomController.getClassroomDetailWithID);
router.get('/:id', passport.authenticate('jwt', { session: false }), authorization.checkAllRole, classroomController.getUserListWithClassroomID);

/* Add a new class */
router.post('/', passport.authenticate('jwt', { session: false }), classroomController.create);

/* Assignment */
// get All assignments of classroom
router.get('/:classroomId/assignments', passport.authenticate('jwt', { session: false }), authorization.checkTeacherRole, assignmentController.getAssignmentWithClassroomID);

// create new assignment
router.post('/:classroomId/assignments', passport.authenticate('jwt', { session: false }), authorization.checkTeacherRole, assignmentController.create);

//update assignment
router.put('/:classroomId/assignments/:assignmentId', passport.authenticate('jwt', { session: false }), authorization.checkTeacherRole, assignmentController.update);

//delete assignment
router.delete('/:classroomId/assignments/:assignmentId', passport.authenticate('jwt', { session: false }), assignmentController.delete);

/* Invite  */
router.post('/:id/userCode', user_classroomController.updateUserCode)

router.get('/invite/:inviteLink', classroomController.getClassroomDetailWithInviteLink);

router.post('/invite/join', user_classroomController.createWithRole);

module.exports = router;