const authService = require('./authenticationService');

exports.googleAuthentication = async (req,res) => {
    // const passport  = await authService.googleAuthentication(req.body.id_token);
    // console.log(passport);
    // res.json(passport);
    authService.googleAuthentication(req.body.id_token).then((passport) => {
        return res.status(200).json(passport);
    })
}