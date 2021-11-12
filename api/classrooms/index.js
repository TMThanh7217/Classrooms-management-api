// classroom router

const express = require('express');
const router = express.Router();

const classroomController = require('./classroomController');

/* List all classes  */
router.get('/', classroomController.listAllClassroom);

/* Classroom detail */
router.get('/:id', classroomController.detail);

/* Add a new class */
router.post('/', classroomController.create);

module.exports = router;