const user_classroomModel = require('./user_classroomModel');

exports.getRole = async (userID, classroomID) => {
    return await user_classroomModel
        .getRole(userID, classroomID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.getUserCode = async (userID, classroomID) => {
    return await user_classroomModel
        .getUserCode(userID, classroomID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.updateUserCode = async (userID, classroomID, userCode) => {
    return await user_classroomModel
        .updateUserCode(userID, classroomID, userCode)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
};
