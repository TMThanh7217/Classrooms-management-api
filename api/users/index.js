// user router

const express = require('express');
const router = express.Router();

const userController = require('./userController');

// for debugging, delete or comment this later
router.get('/listAll', userController.listAllUser)

module.exports = router;