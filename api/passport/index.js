const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const accountModel = require('../accounts/accountModel');
const bcrypt = require('bcrypt');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

// Using passport-local to authenticate with JWT using username, password
// checking passwordand other stuff goes here.  Return a JWT
passport.use(new LocalStrategy( async (username, password, done) => {
    // use to lower case for safeguard
    let account = await accountModel.getAccountWithUsername(username.toLowerCase());
    //console.log(account);
    if (account) {
        console.log('account check when log in');
        console.log(account);
        /*bcrypt.compare(password, account.password, (err, same) => {
            console.log('password: ' + password);
            console.log('account pwd: ' + account.password);
            if (same)
                return done(null, account);

        });*/
        if (password == account.password)
            return done(null, account);
        return done(null, false, { message: 'Incorrect username or password.'});
    }
    return done(null, false, { message: 'error'});
}));

// Using passport-jwt to verify JWT
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    // jwt_payload is an object literal containing the decoded JWT payload
    console.log(jwt_payload);
    let account = await accountModel.getAccountWithID(jwt_payload.id);
    if (account)
        return done(null, account);
    else return done(null, false);
}));

module.exports = passport;