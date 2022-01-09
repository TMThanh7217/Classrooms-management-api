const authService = require('./authenticationService');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const userService = require('../users/userService');
const accountService = require('../accounts/accountService');
const jwt = require('jsonwebtoken');

exports.googleAuthentication = async (req, res) => {
    let ticket = await client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    let payload = ticket.getPayload();
    // console.log("Payload: ");
    // console.log(payload);
    let mail = payload['email'];
    let ggID = payload['sub'];
    //console.log("ggID:"+ggID);
    let name = payload['name'];
    let user_data = await userService.getUserWithEmail(mail);
    
    //console.log('User:' + user);
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    
    
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        // remove all SPACES
        str = str.replace(/\s/g, "");
        return str;
    }
    
    function prepareOutput(output_id, output_userID) {
        return {
            account: {id: output_id, userID: output_userID},
            token: jwt.sign({
                id: output_id,
                name: name
            }, process.env.JWT_SECRET)
        };
    }

    if (user_data) {
        let account_data = await accountService.getAccountWithUserID(user_data.id);

        if (account_data.googleToken == '') {
            let account_update = {
                id: account_data.id,
                username: account_data.username,
                password: account_data.password,
                googleToken: ggID,
            }

            accountService.update(account_update)
                .then(updatedAccount => {
                    if (updatedAccount){
                        console.log(`Account with id = ${updatedAccount} updated`);	
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
        return res.status(200).json(prepareOutput(account_data.id, user_data.id));
    } else {
        let new_account = {
            username: removeVietnameseTones(name),
            password: 'none',
            createdDate: '',
            googleToken: ggID
        }

        let new_user = {
            name: name,
            dob: new Date().toJSON().slice(0,10),
            email: mail,
            sex: 2,
        }

        //------------------------------Choose Unused Username---------------
        let oldAccount = await accountService.getAccountWithUsername(new_account.username);
        let i = 0;
        //console.log('Yo');
        while(oldAccount){
            //console.log('Check old account loop');
            new_account.username = new_account.username + i;
            oldAccount = await accountService.getAccountWithUsername(new_account.username);
            i++;
        }
        //console.log('Ey yooo');
        userService.create(new_user)
            .then(newUser => {
                console.log("new_user", new_user);
                new_user.id = parseInt(newUser);
                new_account.userID = parseInt(newUser);
                //account.username = account.username.toLowerCase()
                accountService
                    .create(new_account, 2)
                    .then(newAccount => {
                        // newAccount should be the id of new account lmao
                        new_account.id = parseInt(newAccount);
                        console.log('New account created: - id: ' + newAccount);
                        //console.log('lmao');
                        console.log(new_account);
                        
                        //------------------------------Result------------------------------
                        return res.status(200).json({
                            account: {id: parseInt(newAccount), userID: parseInt(newUser)},
                            token: jwt.sign({
                                id: parseInt(newAccount),
                                name: name,
                            }, process.env.JWT_SECRET)
                        });
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

    /*authService.googleAuthentication(req.body.id_token)
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
        })*/
}