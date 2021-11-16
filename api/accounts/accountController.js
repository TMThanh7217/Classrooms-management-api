const accountService = require('./accountService');

const userService = require('../users/userService');

// This acutally get info inside User model, not info in Account model
exports.info = async function(req, res) {
     // The id is returned when user login, store it in local storage or cookies or whatever and use it here
    let id = req.body.id // maybe change this later
    // using userService here might be dumb but oh well
    userService.info(id)
        .then( accountInfo => {
            if (accountInfo)
                return res.status(200).json(accountInfo);
            else 
                return res.status(404).json({msg: 'Cannot find account info with the given id'});
        })
}

exports.register = async function(req, res) {
    // not really sure where username, password is store
    let newAccount = {
        username: req.body.username,
        password: req.body.password
    };

    let user = {
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        sex: req.body.sex
    };

    let oldAccount = await accountService.getAccountWithUsername(newAccount.username);
    if (oldAccount) {
        // maybe change the status code later
        return res.status(409).json({msg: 'Account already existed'});
    }
    else {
        let newAccount = await accountService.create(newAccount);
        let newUser = await userService.create(user);
        newAccount.userID = newUser.id;
        return res.status(201).json({msg: 'Account create', id: newAccount.id});
    }
    // use bcrypt or something to encrypt password here
};