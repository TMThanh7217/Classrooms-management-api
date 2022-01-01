// account router
const express = require('express');
const router = express.Router();
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const accountController = require('./accountController');
const authorization = require('../authorization/classroomAuth');

// for debugging, delete or comment this later
router.get('/listAll', accountController.listAllAccount);

// handle login
router.post('/login', passport.authenticate('local', { session: false }),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // req.user contains the authenticated user
        console.log('req.user');
        console.log(req.user);
        // req.uer has id, userID, name for now
        let payload = {
            account: req.user,
            token: jwt.sign({
                id: req.user.id,
                name: req.user.name, // Look like this is null or something? May need to check this later
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
// This was called in frontend's updateProfile api
// look like this is a dupicate route.
router.put('/update-user-info/:id', passport.authenticate('jwt', { session: false }), accountController.update);

// This route id is account id
// This has not been used in frontend yet
router.put('/update-account-info/:id', passport.authenticate('jwt', { session: false }), accountController.updateAccountInfo);

// Update account status, need account id
router.put('/update-account-status/:id', passport.authenticate('jwt', { session: false }), authorization.checkAdminRole, accountController.updateStatus);

module.exports = router;