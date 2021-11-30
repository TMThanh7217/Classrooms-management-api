const model = require("../../models");
const SID = model.SID;
const User = model.User;
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../models');

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (SIDObj) => {
    return await SID.create({
        SID: SIDObj.SID,
        classroomID: SIDObj.classroomID,
        userID: SIDObj.userID,
        name: SIDObj.name
    });
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getUserID = async (Sid, classroomID) => {
    return await SID.findOne({
        raw: true,
        where: {
            SID: Sid,
            classroomID: classroomID
        },
        attributes: ['userID']
    })
}

exports.getBySID = async sid => {
    return await SID.findOne({
        raw: true,
        where: {
            SID: sid,
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}

exports.getAllByClassroomID = async classroomID => {
    return await SID.findAll({
        raw: true,
        where: {
            classroomID: classroomID,
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}

exports.getStudentByClassroomID = async classroomID => {
    return await sequelize.query(   
        'SELECT * FROM SID where ',
        {
            replacements: {},
            type: QueryTypes.SELECT
        }
    );
}

exports.getStudentAndScoreByClassroomID = async classroomID => {
    return await sequelize.query(   
        `SELECT s.SID AS sid, s.name AS studentName, u.id AS userID, u.name AS name, a.id AS assignmentID, a.name AS assignmentName, 
        sa.score AS score, a.maxPoint AS maxScore
        FROM Users AS u 
            JOIN UserClassrooms AS uc ON (uc.userID = u.id) 
            LEFT JOIN Assignments AS a ON (a.classroomID = uc.classroomID) 
            LEFT JOIN StudentAssignments AS sa ON (sa.assignmentID = a.id AND u.id = sa.userID) 
            LEFT JOIN SIDs AS s ON (s.userID = u.id)
        WHERE uc.classroomID = :classroomId AND uc.role = 2`,
        {
            replacements: {classroomId: classroomID},
            type: QueryTypes.SELECT
        }
    );
}

exports.getBySIDAndClassroomID = async (Sid, classroomID) => {
    return await SID.findOne({
        raw: true,
        where: {
            SID: Sid,
            classroomID: classroomID,
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.updateUserID = async (SIDObj) => {
    return await SID.update({
        userID: SIDObj.userID,
        where: {
            SID: SIDObj.SID,
            classroomID: SIDObj.classroomID
        }
    });
}

exports.updateName = async (SIDObj) => {
    return await SID.update({
        name: SIDObj.name,
        where: {
            SID: SIDObj.SID,
            classroomID: SIDObj.classroomID
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.deleteByID = async (id) => {
    return await SID.destroy({
        where: {
            id: id
        }
    });
}

exports.deleteBySID = async (Sid) => {
    return await SID.destroy({
        where: {
            SID: Sid
        }
    });
}

exports.deleteBySIDAndClassroomID = async (Sid, classroomID) => {
    return await SID.destroy({
        where: {
            SID: Sid,
            classroomID: classroomID
        }
    });
}

exports.deleteByUserIDAndClassroomID = async (userID, classroomID) => {
    return await SID.destroy({
        where: {
            userID: userID,
            classroomID: classroomID
        }
    });
}
