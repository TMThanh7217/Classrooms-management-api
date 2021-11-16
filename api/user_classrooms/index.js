const express = require('express');
const router = express.Router();
const user_classroomController = require('./user_classroomController');

router.post('/invite-student', user_classroomController.createStudentRole);

router.post('/invite-teacher', user_classroomController.createTeacherRole);

router.put('/updateUserCode', user_classroomController.updateUserCode);

module.exports = router;
