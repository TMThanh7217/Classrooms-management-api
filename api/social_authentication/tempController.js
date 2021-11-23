const authService = require('./authenticationService');

exports.googleAuthentication = async (req, res) => {
    // const passport  = await authService.googleAuthentication(req.body.id_token);
    // console.log(passport);
    // res.json(passport);
    
    authService.googleAuthentication(req.body.id_token)
        .then((passport) => {
            console.log('Hello?');
            console.log(passport);
            if (passport) {
                console.log(passport);
                return res.status(200).json(passport);
            }
            else {
                console.log("Huhm yes");
                return res.status(500).json({msg: 'Cannot authenticate with google'});
            };
        })
}