const express = require('express');
const router = express.Router();
const passport = require('./index');
const jwt = require('jsonwebtoken');

router.post('/', passport.authenticate('local', { session: false }), 
    function (req, res) {
        res.json({
            user: req.user,
            token: jwt.sign({
                id: req.user.id,
                username: req.user.username
            }, process.env.JWT_SECRET,{
                expiresIn: '1h'
            })
        })
});

module.exports = router;