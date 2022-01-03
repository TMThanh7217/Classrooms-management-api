const accountService = require('./accountService');
const userService = require('../users/userService');
const bcrypt = require('bcrypt');
const saltRound = 11;

// This is almost the same as the old user_classroom getRole function
exports.getRole = async function(req, res) {
    let userID = parseInt(req.params.userId);
    accountService.getRoleWithUserID(userID)
        .then( result => {
            if (result) {
                /*console.log(result);
                console.log(result.role);*/
                //return res.status(200).json(result);
                // Why do i use result.role before in user_classroomController? idk check later
                return res.status(200).json(result.role);
            }
            else return res.status(404).json({msg: 'Cannot find the role of this user'});
        });
};

exports.register = async function(req, res) {
    // not really sure where username, password is store
    let account = {
        username: req.body.username,
        password: req.body.password,
        createdDate: '',
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
    console.log(oldAccount);
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
                    .create(account, 2) // default create set role to student
                    .then(newAccount => {
                        /*console.log('\nnew account id:');
                        console.log(newAccountID);*/
                        // return only the id of new account lmao
                        return res.status(200).json({msg: 'Account created', id: newAccount})
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
};

exports.adminCreateWithRole = async function(req, res) {
    // not really sure where username, password is store
    let account = {
        username: req.body.username,
        password: req.body.password,
        createdDate: '',
        googleToken: '',
        role: parseInt(req.body.role)
    };

    let user = {
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        sex: req.body.sex
    };

    let oldEmail = await userService.getUserWithEmail(user.email);
    let oldAccount = await accountService.getAccountWithUsername(account.username);
    console.log(oldAccount);
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
                    .create(account, account.role) // default create set role to student
                    .then(newAccount => {
                        /*console.log('\nnew account id:');
                        console.log(newAccountID);*/
                        // return only the id of new account lmao
                        return res.status(200).json({msg: 'Account created', id: newAccount})
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

// this update user info only
exports.update = async (req, res) => {
    let user = {
        id: parseInt(req.params.id)
    }

    let account = {
        username: req.body.username,
        password: req.body.password,
    }
    //console.log(user);

    let oldUser = await userService.getUserWithID(user.id);
    if (oldUser) {
        // use this if the update need all attribute
        /*user.name = oldUser.name;
        user.dob = oldUser.dob;
        user.email = oldUser.email;
        user.sex = oldUser.sex;*/
        if (req.body.name != '')
            user.name = req.body.name;
        else user.name = oldUser.name;

        if (req.body.dob != '')
            user.dob = req.body.dob;
        else user.dob = oldUser.dob;

        if (req.body.email != '')  
            user.email = req.body.email;
        else user.email = oldUser.email;
            
        if (req.body.sex != '')
            user.sex = req.body.sex;
        else user.sex = oldUser.sex;

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
                else return res.status(500).json({msg: 'Cannot update user info'});
            })
    }
    else return res.status(404).json({msg: 'Cannot find this account'});
}

exports.updateAccountInfo = async (req, res) => {
    let account = {
        id: parseInt(req.body.id)
    }
    
    let newUsername = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let googleToken = req.body.googleToken;

    let oldAccount = await accountService.getAccountWithID(account.id);
    if (oldAccount) {
        // use this if the update really need all attribute to work
        /*account.username = oldAccount.username;
        account.password = oldAccount.password;
        account.googleToken = oldAccount.googleToken;*/
        if (oldPassword != '') {
            if (oldPassword != oldAccount.password)
                return res.status(400).json({msg: 'Password does not match'});
            if (newPassword != '')
                account.password = newPassword;
            }
        
        if (newUsername != '') {
            let dupAcc = await accountService.getAccountWithUsername(newUsername);
            if (dupAcc)
                return res.status(401).json({msg: 'Username has already been used'});
            else account.username = newUsername;
        }

        if (googleToken != '')
            account.googleToken = googleToken;

        accountService
            .update(account) // update does not update role
            .then(updatedAccount => {
                if (updatedAccount){
                    return res.status(200).json(updatedAccount);
                }
                else return res.status(500).json({msg: 'Cannot update account info'});
            })
    }
    else return res.status(404).json({msg: 'Cannot find this account'});
}

exports.banAccount = async (req, res) => {
    // front end return a list find a way to update everything in the list
    let accountList = req.body;
    //console.log(accountList);
    //return res.status(200).json({msg: 'ehe'});
    for (let i = 0 ; i < accountList.length; i++) {
        /*console.log("accountList");
        console.log(accountList[i]);*/

        let oldAccount = await accountService.getAccountWithID(parseInt(accountList[i]));
        if (oldAccount) {
            //console.log(oldAccount);
            accountService
                .updateStatus(oldAccount.id, 1)
                .then(result => {
                    if (result) {
                        console.log(result);
                    }
                    else console.log('Cannot update account status');
                })
        }
        else console.log('Cannot find this account');
    }
    return res.status(200).json({msg: 'Hi'});
}


exports.getAllJoinedUsers = async (req, res) => {
    return res.json(await accountService.getAllJoinedUsers(req.query))
}