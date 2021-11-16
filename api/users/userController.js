const userService = require('./userService');

exports.listAllUser = async (req, res) => {
    userService.listAllUser()
        .then(userList => {
            if (userList)
                return res.status(200).json(userList);
            return res.status(404).json({msg: 'Cannot get User list'})
        })
}
