// account router
const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const accountController = require('./accountController');

// for debugging, delete or comment this later
router.get('/listAll', passport.authenticate('jwt', { session: false }), accountController.listAllAccount);

// profile page
router.get('/', passport.authenticate('jwt', { session: false }), accountController.info);

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
router.post('/register', accountController.register);

// update profile (info in user model)
router.put('/:id', passport.authenticate('jwt', { session: false }), accountController.update);

module.exports = router;