const model = require('../../models');
const UserClassroom = model.UserClassroom;

exports.create = async (user_classroom, role) => {
    return await UserClassroom.create({
        userID: user_classroom.userID,
        classroomID: user_classroom.classroomID, 
        role: role, // change this later, default = student 
        userCode: user_classroom.userCode
    });
}

exports.findUserInClassroom = async (userID, classroomID) => {
    return await UserClassroom.findOne({
        raw: true,
        where: {
            userID: userID,
            classroomID: classroomID,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
}

exports.getRole = async (userID, classroomID) => {
    return await UserClassroom.findOne({
        raw: true,
        where: {
            userID: userID,
            classroomID: classroomID,
        },
        attributes: ['role']
    });
}

exports.getWithUserID = async (userID) => {
    return await UserClassroom.findAll({
        raw: true,
        where: {
            userID: userID
        },
        attriutes: { exclude: ['updatedAt', 'createdAt'] } // why is this doesn't work
    });
}

exports.getUserCode = async (userID, classroomID) => {
    return await UserClassroom.findOne({
        raw: true,
        where: {
            userID: userID,
            classroomID: classroomID,
        },
        attributes: ['userCode']
    });
}

exports.updateUserCode = async (userID, classroomID, userCode) => {
    return await UserClassroom.update({
        userCode: userCode
    }, {
        where: {
            userID: userID,
            classroomID: classroomID
        }
    })
}
