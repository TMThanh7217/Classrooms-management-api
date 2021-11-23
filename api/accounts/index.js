// account router
const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const accountController = require('./accountController');

// for debugging, delete or comment this later
router.get('/listAll', accountController.listAllAccount);

// profile page
router.get('/', passport.authenticate('jwt', { session: false }), accountController.info);

// handle login
router.post('/login', passport.authenticate('local', { session: false }),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // req.user contains the authenticated user
        let payload = {
            account: req.user,
            token: jwt.sign({
                id: req.user.id,
                username: req.user.username, // Look like this is null or something? May need to check this later
            }, process.env.JWT_SECRET)
        };
        /*console.log("My token from post login: ");
        console.log(payload.token);*/
        res.json(payload);
});

// handle register
router.post('/register', accountController.register);

// update profile (info in user model)
router.put('/:id', passport.authenticate('jwt', { session: false }), accountController.update);
// This route id is user id
router.put('/update-user-info/:id', passport.authenticate('jwt', { session: false }), accountController.update);
// This route id is account id
router.put('/update-account-info/:id', passport.authenticate('jwt', { session: false }), accountController.updateAccountInfo);

module.exports = router;