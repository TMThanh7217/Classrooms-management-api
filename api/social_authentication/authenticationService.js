const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const userService = require('../users/userService');
const accountService = require('../accounts/accountService')
const jwt = require('jsonwebtoken');

exports.googleAuthentication = async (tokenID) => {
    const ticket = await client.verifyIdToken({
        idToken: tokenID,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    // console.log("Payload: ");
    // console.log(payload);
    const mail = payload['email'];
    const ggID = payload['sub'];
    //console.log("ggID:"+ggID);
    const name = payload['name'];
    const user_data = await userService.getUserWithEmail(mail);
    
    //console.log('User:' + user);
    function prepareOutput(output_id, output_userID){
        return {
            account: {id: output_id, userID: output_userID},
            token: jwt.sign({
                id: output_id
            }, process.env.JWT_SECRET)
        };
    }
    if (user_data) {
        const account_data = await accountService.getAccountWithUserID(user_data.id);
        if (account_data.id == ''){
            let account_update = {
                id: account_data.id,
                username: account_data.username,
                password: account_data.password,
                googleToken: ggID,
            }
            await accountService.update(account_update)
            .then(updatedAccount => {
                if (updatedAccount){
                    console.log(`Account with id = ${updateAccount} updated`);	
                }
                else 
                    console.log('Can not update account info :<');
            });
        }
        // const result = {
        //     account: {id: account_data.id, userID: user_data.id},
        //     token: jwt.sign({
        //         id: account_data.id,
        //     }, process.env.JWT_SECRET)
        // };
        return prepareOutput(account_data.id, user_data.id);
    } else {
        let new_account = {
            username: name,
            password: 'undefined',
            createdDate: new Date().toJSON().slice(0,10),
            googleToken: ggID,
        }
        let new_user = {
            name: name,
            dob: new Date().toJSON().slice(0,10),
            email: mail,
            sex: 2,
        }

        //------------------------------
        // let oldEmail = await userService.getUserWithEmail(new_user.email);
        let oldAccount = await accountService.getAccountWithUsername(new_account.username);
        let i = 0;
        while(oldAccount){
            new_account.username = new_account.username + i;
            oldAccount = await accountService.getAccountWithUsername(new_account.username);
            i++;
        }
    
        userService.create(new_user)
            .then(newUser => {
                new_user.id = parseInt(newUser);
                new_account.userID = parseInt(newUser);
                //account.username = account.username.toLowerCase()
                accountService
                    .create(new_account)
                    .then(newAccount => {
                        // newAccount should be the id of new account lmao
                        new_account.id = parseInt(newAccount);
                        console.log('New account created: -id: ' + newAccount);

                        console.log(new_account);
            
                        //------------------------------Result------------------------------
                        
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        //------------------------------Result------------------------------
        // const result = {
        //     account: {id: new_account.id, userID: new_account.userID},
        //     token: jwt.sign({
        //         id: new_account.id,
        //     }, process.env.JWT_SECRET)
        // };
        // return result;
    }
}