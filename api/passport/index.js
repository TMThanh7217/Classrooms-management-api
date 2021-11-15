const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const accountModel = require('../accounts/accountModel');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

// Using passport-local to authenticate with JWT using username, password
// Login, checking passwordand other stuff goes here.  Return a JWT
passport.use(new LocalStrategy( async (username, password, done) => {
    let account = await accountModel.getAccountWithUsername(username);
    //console.log(account);
    if (account) {
        if (password == account.password)
            return done(null, account);
        else 
            return done(null, false, { message: 'Incorrect username or password.'});
    }
    return done(null, false, { message: 'error'});
}));

// Using passport-jwt to verify JWT
// Register new account goes here
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    // jwt_payload is an object literal containing the decoded JWT payload
    console.log(jwt_payload);
    let account = await accountModel.getAccountWithID(jwt_payload.id);
    if (account)
        return done(null, account);
    else return done(null, false);
}));

module.exports = passport;