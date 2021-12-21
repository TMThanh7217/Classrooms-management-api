// classroom router

const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const authorization = require('../authorization/classroomAuth');
const classroomController = require('./classroomController');
const user_classroomController = require('../user_classrooms/user_classroomController');
const assignmentController = require('../assignments/assignmentController');
const sidController = require('../sid/sidController');
const student_assignmentController = require('../student_assignments/student_assignmentController');
const accountController = require('../accounts/accountController');

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
router.get('/:classroomId/sids', passport.authenticate('jwt', { session: false }), sidController.findAllByClassroomId);

// This one used the old SQL query before changing the database structure. Need a fix
router.get('/:classroomId/scoreboard', passport.authenticate('jwt', { session: false }), sidController.findStudentAndScoreByClassroomID);

// import student list
router.post('/:classroomId/sids/import', passport.authenticate('jwt', { session: false }), sidController.importStudentList);

// import grade for an assignment
// also need a fix
// did some adjustment not sure if working as intended
router.post('/:classroomId/assignments/:assignmentId/scores/import', passport.authenticate('jwt', { session: false }), student_assignmentController.importGradeForAnAssignment);

// update gradeboard score
// yep this need some adjustment too
// did some adjusment not sure if working as intended again
router.put('/:classroomId/assignments/:assignmentId/scores/:userId', passport.authenticate('jwt', { session: false }), student_assignmentController.updateScore);

// Add studentId
router.post('/:classroomId/sids', passport.authenticate('jwt', { session: false }), sidController.addSID);

/* Invite  */
router.post('/:id/userCode', user_classroomController.updateUserCode)

router.get('/invite/:inviteLink', classroomController.getClassroomDetailWithInviteLink);

/* Role */
router.get('/:classroomId/users/:userId/role', accountController.getRole);

// user_classroom does not hold role anymore, account do now (the default role is 2). So just create should be suffice.
router.post('/invite/join', user_classroomController.create);

module.exports = router;