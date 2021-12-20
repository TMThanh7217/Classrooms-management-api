const model = require('../../models');
const UserClassroom = model.UserClassroom;
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../models');

exports.create = async (user_classroom) => {
    return await UserClassroom.create({
        userID: user_classroom.userID,
        classroomID: user_classroom.classroomID,
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

// uh oh
exports.findClassroomsOfUserHasRole = async (userId, roleList) => {
    return await sequelize.query(
        `SELECT Classrooms.name, Classrooms.id
        FROM UserClassrooms JOIN Classrooms ON (UserClassrooms.ClassroomID = Classrooms.id)
        WHERE UserClassrooms.userID = :userId AND UserClassrooms.role IN (:role)`,
        {
            replacements: { userId: userId, role: roleList },
            type: QueryTypes.SELECT
        }
    )
}