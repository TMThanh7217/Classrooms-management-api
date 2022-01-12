const userService = require('./userService');
const accountService = require('../accounts/accountService');

// Get info inside User model
exports.info = async function(req, res) {
    // This userId is from params.
    let userId = parseInt(req.params.userId);

    // req.user store whatever jwt strategy return
    console.log("Token userID:", req.user.userID);
    console.log("Target userID:", userId);

// let account = await accountService.getAccountWithUserID(userId);
// if (account) {
    let accountInfos = await userService.info(userId);
    if (accountInfos.length > 0) {
        let account = await accountService.getAccountWithUserID(req.user.userID);
        let accountInfo = {...accountInfos.pop(), isOwner: req.user.userID == userId, validate: account.validate};
        // Add the role since this maybe needed
        // accountInfo.role = account.role;
        // The isOwner is used to determine if that user is the owner of that account
        // Using the userId stored in the JWT and the userId received from the params to check ownership
        // accountInfo.isOwner = req.user.userID == userId;
        console.log('isOwner', accountInfo.isOwner);
        console.log('accountInfo', accountInfo)
        return res.status(200).json(accountInfo);
    }
    else 
        return res.status(404).json({msg: 'Cannot find account info with the given id'});
// }
};

exports.listAllUser = async (req, res) => {
    userService.listAllUser()
        .then(userList => {
            if (userList)
                return res.status(200).json(userList);
            return res.status(500).json({msg: 'Cannot get User list'})
        })
}

exports.getAllUserInClassroomWithRole = async (req, res) => {
    let classroomID = parseInt(req.params.classroomId);
    let role = parseInt(req.query.role);
    console.log('classroomID', classroomID);
    console.log('role', role);
    let userList = await userService.getAllUserInClassroomWithRole(classroomID, role);
    if (userList) {
        console.log('userList', userList);
        return res.status(200).json(userList);
    }
    else {
        console.log('Cannot get user list');
        return res.status(500).json({msg: 'Cannot get User list'})
    }
}
