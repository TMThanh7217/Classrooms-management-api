const user_classroomModel = require('./user_classroomModel');

exports.create = async (user_classroom, role) => {
    return await user_classroomModel
        .create(user_classroom, role)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.findUserInClassroom = async (userID, classroomID) => {
    return await user_classroomModel
        .findUserInClassroom(userID, classroomID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
};

exports.getRole = async (userID, classroomID) => {
    return await user_classroomModel
        .getRole(userID, classroomID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.getWithUserID = async (userID) => {
    return await user_classroomModel
        .getWithUserID(userID)
        .then(result => result)
        .catch(err => console.log(err))
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

exports.findClassroomsOfUserHasRole = async (userId, roleList) => {
    let instance = await user_classroomModel.findClassroomsOfUserHasRole(userId, roleList)
    return instance
}