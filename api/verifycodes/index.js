const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');

const verifycodeController = require('./verifycodeController');


module.exports = router;