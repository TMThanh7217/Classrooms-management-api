const verifycodeService = require('./verifycodeService');
const helper = require('../helper');
const userService = require('../users/userService');
const accountService = require('../accounts/accountService');

exports.create = async (req, res) => {
    let email = req.body.email;
    console.log('email', email);
    let user = await userService.getUserWithEmail(email);
    console.log('user', user);
    /*let subject = "Test send verification link";
    let verification_link = process.env.ROOT_LINK + `/verify/email?email`;
    let content = `Hello, this email is sent from classroom api.\nYour verification link can be found below:\n${verification_link}`;

    console.log(verification_link);
    helper.handleSendVerificationEmail(email, subject, content);
    return res.status(200).json({msg: 'hi'});*/
    if (user) {
        let userID = user.id;
        let oldVCode = await verifycodeService.getWithUserID(userID);
        let vCode = helper.makeInviteLink(4);
        let subject = "Verification link";
        let verification_link = process.env.ROOT_LINK + `/verify/email?email=${email}&code=${vCode}`; 
        let content = `Hello, this email is sent from classroom api.\nYour verification link can be found below:
                        \n${verification_link}
                        \nAnd this is your code: ${vCode}`;

        if (oldVCode) {
            let result = await verifycodeService.update(userID, vCode);
            if (result) {
                console.log('Update successfully');
                helper.handleSendVerificationEmail(email, subject, content);
                console.log('Pass handleSendVerificationEmail');
                return res.status(200).json({msg: 'Update successfully'});
            }
            else {
                console.log('Update fail');
                return res.status(500).json({msg: 'Update fail'});
            }
        }
        else {
            let newVCode = await verifycodeService.create(userID, vCode);
            if (newVCode) {
                console.log('newVCode', newVCode);
                helper.handleSendVerificationEmail(email, subject, content);
                console.log('Pass handleSendVerificationEmail');
                return res.status(200).json('Create new verify code successfully');
            }
            else {
                console.log('Cannot create new verify code');
                return res.status(500).json({msg: 'Cannot create new verify code'});
            }
        }
    }
    return res.status(500).json({msg: 'Cannot find any user with this email'});
};

exports.validateEmail = async (req, res) => {
    let email = req.body.email;
    let vCode = req.body.code;
    let user = await userService.getUserWithEmail(email);
    console.log('user', user);
    if (user) {
        let verifyCode = await verifycodeService.getWithCode(vCode);
        console.log('verifyCode', verifyCode);
        if (verifyCode) {
            if (verifyCode.code == vCode) {
                console.log('Validate email successfully');
                let result = await accountService.updateValidate(user.id, 1);
                if (result) {
                    console.log({msg: 'Update validate successfully'});
                    return res.status(200).json({msg: 'Validate email successfully'});
                }
                return res.status(500).json({msg: 'Update email fail'});
            }
            return res.status(500).json({msg: 'Missmatch verify code'});
        }
        return res.status(500).json({msg: 'Validate email fail'});
    }
    return res.status(500).json({msg: 'Cannot find any user with this email'});
};
