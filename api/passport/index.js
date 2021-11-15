const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new LocalStrategy(
    function(username, password, done) {
      if(username === "admin" && password === "123"){
          let user = {
              id: 0,
              username: username,
              //password: password
          };
          return(done(null, user));
      }
      return done(null, false, { message: 'Incorrect username or password.'});
    }
));

passport.use(new JwtStrategy(opts, 
    function(jwt_payload, done) {
        console.log(jwt_payload);
        return done(null , { id: jwt_payload.id, username: jwt_payload.username });
        /*User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
    });*/
}));

module.exports = passport;