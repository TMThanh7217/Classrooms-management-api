const accountService = require('./accountService');
const userService = require('../users/userService');
const bcrypt = require('bcrypt');
const saltRound = 11;

// This acutally get info inside User model, not info in Account model
exports.info = async function(req, res) {
     // The id is returned when user login, store it in local storage or cookies or whatever and use it here
    let userId = req.query.id;
    // using userService here might be dumb but oh well
    console.log("Hello?");console.log(userId);
    userService.info(parseInt(userId))
        .then( accountInfo => {
            if (accountInfo)
                return res.status(200).json(accountInfo);
            else 
                return res.status(404).json({msg: 'Cannot find account info with the given id'});
        })
}

exports.register = async function(req, res) {
    // not really sure where username, password is store
    let account = {
        username: req.body.username,
        password: req.body.password,
        created_date: '',
        googleToken: '',
    };

    let user = {
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        sex: req.body.sex
    };

    let oldEmail = await userService.getUserWithEmail(user.email);
    let oldAccount = await accountService.getAccountWithUsername(account.username);

    if (oldEmail)
        return res.status(409).json({msg: 'Email has been used'}); 

    if (oldAccount) {
        // maybe change the status code later
        return res.status(409).json({msg: 'Account already existed'});
    }
    else {
        userService.create(user)
            .then(newUser => {
                /*console.log('\nnew user:');
                console.log(newUser);*/
                // create only return the id for now
                account.userID = newUser;
                // use bcrypt or something to encrypt password here
                account.username = account.username.toLowerCase()
                /*bcrypt.genSalt(saltRound, (err, salt) => {
                    bcrypt.hash(account.password, salt, (err, hash) => {
                        console.log(`hash: ${hash}`);
                        account.password = hash;
                    })
                });
                console.log("account check when register");
                console.log(account);*/
                /*bcrypt.genSalt(saltRound, (err, salt) => {
                    bcrypt.hashSync(account.password, salt, (err, hash) => {
                        console.log(`hash: ${hash}`);
                        account.password = hash;
                    })
                });*/
                console.log(account);
                accountService
                    .create(account)
                    .then(newAccount => {
                        /*console.log('\nnew account id:');
                        console.log(newAccountID);*/
                        // return only the id of new account lmao
                        return res.status(201).json({msg: 'Account created', id: newAccount})
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
};

exports.listAllAccount = async (req, res) => {
    accountService.listAllAccount()
        .then(accountList => {
            if (accountList)
                return res.status(200).json(accountList);
            else 
                return res.status(404).json({msg: 'Cannot find any account'});
        })
};

exports.update = async (req, res) => {
    let user = {
        id: parseInt(req.params.id),
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        sex: req.body.sex,
    }

    let account = {
        username: req.body.username,
        password: req.body.password,
    }

    console.log(user);
    userService
        .update(user)
        .then(updatedUser => {
            // may need to change this
            if (updatedUser){
                /*if (account.username != '' && account.password != '')
                // this only return account id
                    accountService
                        .update(account)
                        .then(updatedAccount => {
                            return res.status(200).json({updatedUser, updatedAccount});
                        })*/
                return res.status(200).json(updatedUser);
            }
            else return res.status(404).json({msg: 'Cannot update this account info'});
        })
}