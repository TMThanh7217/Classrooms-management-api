const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const accountModel = require('../accounts/accountModel');
const userModel = require('../users/userModel');
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
        // account status used to show if an account is normal or lock, ...
        // 0 = default = not lock, 1 = lock/ban
        if (account.status == 1)
            return done(null, false, { message: 'This account has been locked.'});
            
        /*console.log('account check when log in');
        console.log(account);*/
        /*bcrypt.compare(password, account.password, (err, same) => {
            console.log('password: ' + password);
            console.log('account pwd: ' + account.password);
            if (same)
                return done(null, account);

        });*/
        // oh boi i sure hope using await here doesn't lead to some funny haha stuff later
        if (password == account.password) {
            let user = await userModel.getUserWithID(account.userID);
            return done(null, {id: account.id, userID: account.userID, name: user.name});
        }
        return done(null, false, { message: 'Incorrect username or password.'});
    }
    return done(null, false, { message: 'Error'});
}));

// Using passport-jwt to verify JWT
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    // jwt_payload is an object literal containing the decoded JWT payload
    /*console.log("JWT payload");
    console.log(jwt_payload);*/
    // jwt_payload return id and iat(issued at) for now
    let account = await accountModel.getAccountWithID(jwt_payload.id);
    if (account) {
        let user = await userModel.getUserWithID(account.userID);
        return done(null, {id: account.id, userID: account.userID, name: user.name});
    }
    else return done(null, false);
}));

module.exports = passport;