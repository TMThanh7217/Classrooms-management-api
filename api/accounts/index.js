// account router
const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const accountController = require('./accountController');

// profile page
router.get('/', accountController.info);

// handle login
router.post('/login', passport.authenticate('local', { session: false }),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // req.user contains the authenticated user
        res.json({
            account: req.user,
            token: jwt.sign({
                id: req.user.id,
                username: req.user.username,
            }, process.env.JWT_SECRET)
        })
});

// handle register
router.post('/register', (req, res) => {

});

module.exports = router;