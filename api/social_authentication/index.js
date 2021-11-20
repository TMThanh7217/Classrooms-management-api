const express = require('express');
const router = express.Router();
const authenticattionController = require('./authenticationController');

router.post('/google-authentication', authenticattionController.googleAuthentication);

module.exports = router;