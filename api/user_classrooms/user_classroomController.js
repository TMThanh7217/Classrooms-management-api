const user_classroomService = require('./user_classroomService');

exports.updateUserCode = async (req, res) => {
    user_classroomService.updateUserCode(req.body.userID, req.body.classroomID, req.body.userCode)
        .then(result => {

        })
};