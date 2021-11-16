// classroom router

const express = require('express');
const router = express.Router();

const classroomController = require('./classroomController');

/* List all classes  */
//router.get('/', classroomController.listAllClassroom);
router.get('/', classroomController.listAllClassroomWithUserID);

/* Classroom detail */
//router.get('/:id', classroomController.getClassroomDetailWithID);
router.get('/:id', classroomController.getUserListWithClassroomID);

/* Add a new class */
router.post('/', classroomController.create);

module.exports = router;