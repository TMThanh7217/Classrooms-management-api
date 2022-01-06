const user_classroomModel = require('./user_classroomModel');

exports.create = async (user_classroom) => {
    return await user_classroomModel
        .create(user_classroom)
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

exports.findClassroomsWithUserId = async (userID) => {
    return await user_classroomModel
        .findClassroomsWithUserId(userID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
};

exports.findStudentWithClassroomID = async (classroomID) => {
    return await user_classroomModel
        .findStudentWithClassroomID(classroomID)
        .then(result => result)
        .catch(err => console.log(err))
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
