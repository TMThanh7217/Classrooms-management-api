const model = require("../../models");
const SID = model.SID;
const User = model.User;
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../models');

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (SIDObj) => {
    return await SID.create({
        SID: SIDObj.sid,
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

exports.getByUserIDAndClassroomID = async (userID, classroomID) => {
    return await SID.findOne({
        raw: true,
        where: {
            userID: userID,
            classroomID: classroomID
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}

// uh oh
// Did some adjustment, work as intended? not very sure
exports.getStudentAndScoreByClassroomID = async classroomID => {
    return await sequelize.query(   
        `SELECT s.SID AS sid, s.name AS studentName, u.id AS userID, u.name as UserName, 
        a.id AS assignmentID, a.name AS assignmentName, sa.score AS score, a.maxPoint as maxScore
        FROM SIDs AS s LEFT JOIN Users AS u ON (s.userID = u.id) 
            LEFT JOIN Assignments AS a ON(a.classroomID = :classroomId) 
            LEFT JOIN StudentAssignments AS sa ON (sa.assignmentID = a.id)
            LEFT JOIN UserClassrooms AS uc ON (s.userID = uc.userID)
        WHERE a.finalize = 1 and uc.classroomID = :classroomId AND NOT EXISTS (SELECT * FROM Accounts AS acc WHERE u.id = acc.userID AND acc.role IN (0, 1))`,
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

exports.getByUserID = async (userID) => {
    return await SID.findOne({
        raw:true,
        where: {
            userID: userID
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.updateUserID = async (SIDObj) => {
    return await SID.update({
        userID: SIDObj.userID,
    }, {
        where: {
            SID: SIDObj.SID,
            classroomID: SIDObj.classroomID
        }
    });
}

exports.updateName = async (SIDObj) => {
    return await SID.update({
        name: SIDObj.name
    }, {
        where: {
            SID: SIDObj.SID,
            classroomID: SIDObj.classroomID
        }
    });
}

exports.updateSID = async (sid, userID) => {
    return await SID.update({
        SID: sid,
    }, {
        where: {
            userID: userID
        }
    });
}

exports.updateNameAndUserID = async ({sid, userID, classroomID, name}) => {
    return await SID.update({
        name: name,
        userID: userID
    }, {
        where: {
            sid: sid
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
