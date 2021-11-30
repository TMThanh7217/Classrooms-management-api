// classroom router

const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const authorization = require('../authorization/classroomAuth');
const classroomController = require('./classroomController');
const user_classroomController = require('../user_classrooms/user_classroomController');
const assignmentController = require('../assignments/assignmentController');
const sidController = require("../sid/sidController")

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
router.get('/:classroomId/assignments', passport.authenticate('jwt', { session: false }), assignmentController.getAssignmentWithClassroomID);

// create new assignment
router.post('/:classroomId/assignments', passport.authenticate('jwt', { session: false }), authorization.checkTeacherRole, assignmentController.create);

//update assignment
router.put('/:classroomId/assignments/:assignmentId', passport.authenticate('jwt', { session: false }), authorization.checkTeacherRole, assignmentController.update);

// check the role of these two router later
// update assignment's position
router.put('/:classroomId/assignments/', passport.authenticate('jwt', { session: false }), authorization.checkTeacherRole, assignmentController.updateAssignmentPosition);

//delete assignment
router.delete('/:classroomId/assignments/:assignmentId', passport.authenticate('jwt', { session: false }), authorization.checkTeacherRole, assignmentController.delete);

/* SID */
// get all sid with classroomID
router.get('/:classroomId/sids', passport.authenticate('jwt', { session: false }), sidController.findAllByClassroomId)

router.get('/:classroomId/scoreboard',  sidController.findStudentAndScoreByClassroomID)

// Add studentId
router.post('/:classroomId/sids', passport.authenticate('jwt', { session: false }), sidController.addSID)

/* Invite  */
router.post('/:id/userCode', user_classroomController.updateUserCode)

router.get('/invite/:inviteLink', classroomController.getClassroomDetailWithInviteLink);

/* Role */
router.get('/:classroomId/users/:userId/role', user_classroomController.getRole);

router.post('/invite/join', user_classroomController.createWithRole);

module.exports = router;