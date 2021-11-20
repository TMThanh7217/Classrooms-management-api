const authService = require('./authenticationService');

exports.googleAuthentication = async (req,res,next) => {
    const passport  = await authService.googleAuthentication(req.body.id_token);
    res.json(passport);
}