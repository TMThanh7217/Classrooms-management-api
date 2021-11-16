const accountService = require('./accountService');
const userService = require('../users/userService');

// This acutally get info inside User model, not info in Account model
exports.info = async function(req, res) {
     // The id is returned when user login, store it in local storage or cookies or whatever and use it here
    let id = req.user.id // maybe change this later
    // using userService here might be dumb but oh well
    userService.info(id)
        .then( accountInfo => {
            if (accountInfo)
                return res.status(200).json(accountInfo);
            else 
                return res.status(404).json({msg: 'Cannot find account info with the given id'});
        })
}
