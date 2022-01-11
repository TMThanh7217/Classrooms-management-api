const verifycodeService = require('./verifycodeService');
const helper = require('../helper');
const userService = require('../users/userService');
const accountService = require('../accounts/accountService');

exports.create = async (req, res) => {
    let email = req.body.email;
    let user = await userService.getUserWithEmail(email);
    console.log('user', user);

    if (user) {
        let userID = user.id;
        let oldVCode = await verifycodeService.getWithUserID(userID);
        let vCode = helper.makeInviteLink(4);
        if (oldVCode) {
            let result = await verifycodeService.update(userID, vCode);
            if (result) {
                console.log('Update successfully');
                helper.handleSendVerificationEmail(email, vCode, "Test test");
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
                helper.handleSendVerificationEmail(email, vCode, "Test test");
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
            }
        }
        return res.status(500).json({msg: 'Validate email fail'});
    }
    return res.status(500).json({msg: 'Cannot find any user with this email'});
};
