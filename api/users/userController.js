const userService = require('./userService');
const accountService = require('../accounts/accountService');

// Get info inside User model
exports.info = async function(req, res) {
    // This userId is from params.
    let userId = parseInt(req.params.userId);
    
    // req.user store whatever jwt strategy return
    console.log("Token userID:", req.user.userID);
    console.log("Target userID:", userId);

    let account = await accountService.getAccountWithUserID(userId);
    if (account) {
        let accountInfo = await userService.info(userId);
        if (accountInfo){
            // Add the role since this maybe needed
            accountInfo.role = account.role;
            // The isOwner is used to determine if that user is the owner of that account
            // Using the userId stored in the JWT and the userId received from the params to check ownership
            accountInfo.isOwner = (req.user.userID == userId) ? true : false;
            console.log(accountInfo.isOwner);
            return res.status(200).json(accountInfo);
        }
        else 
            return res.status(404).json({msg: 'Cannot find account info with the given id'});
    }
};

exports.listAllUser = async (req, res) => {
    userService.listAllUser()
        .then(userList => {
            if (userList)
                return res.status(200).json(userList);
            return res.status(404).json({msg: 'Cannot get User list'})
        })
}
