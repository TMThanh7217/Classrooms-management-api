const model = require("../../models");
const Gradereview = model.Gradereview;
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../../models");

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (gradereview) => {
    return await Gradereview.create({
        senderSID: gradereview.senderSID,
        assignmentID: gradereview.assignmentID,
        expectGrade: gradereview.expectGrade,
        explaination: gradereview.explaination
    });
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getWithID = async (id) => {
    return await Gradereview.findOne({
        raw: true,
        where: {
            id: id
        },
        attributes: {exclude: ['updatedAt']}
    })
}

exports.getWithSenderSIDAndAssignmentID = async (senderSID, assignmentID) => {
    return await Gradereview.findOne({
        raw: true,
        where: {
            senderSID: senderSID,
            assignmentID: assignmentID
        },
        attributes: {exclude: ['updatedAt']}
    })
}

exports.getWithSenderSID = async (senderSID) => {
    return await Gradereview.findAll({
        raw: true,
        where: {
            senderSID: senderSID
        },
        attributes: {exclude: ['updatedAt']}
    })
}

exports.getWithAssignmentID = async (assignmentID) => {
    return await Gradereview.findAll({
        raw: true,
        where: {
            assignmentID: assignmentID
        },
        attributes: {exclude: ['updatedAt']}
    })
}

exports.getByUserIDAndClassroomID = async (userID, classroomID) => {
    return model.sequelize.query(
        `
            SELECT gr.*, sid.name AS authorName, a.name AS assignmentName, sa.score, a.maxPoint
            FROM Gradereviews AS gr
            LEFT JOIN SIDs AS sid ON(sid.SID = gr.senderSID)
            LEFT JOIN Assignments AS a ON(a.id = gr.assignmentID)
            LEFT JOIN StudentAssignments AS sa ON (sa.SID = sid.SID AND sa.assignmentID = a.id)
            WHERE a.classroomID = :classroomID AND (sid.userID = :userID OR EXISTS (SELECT * FROM Accounts WHERE Accounts.userID = :userID AND Accounts.role != 2)
            )
        `, {
            type: QueryTypes.SELECT,
            replacements: {
                userID: userID,
                classroomID: classroomID
            }
        }
    )
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.updateWithID = async (id, expectGrade, explaination) => {
    return await Gradereview.update({
        expectGrade: expectGrade,
        explaination: explaination
    }, {
        where: {
            id: id
        }
    });
}

exports.updateWithSenderSIDAndAssignmentID = async (senderSID, assignmentID, expectGrade, explaination) => {
    return await Gradereview.update({
        expectGrade: expectGrade,
        explaination: explaination
    }, {
        where: {
            senderSID: senderSID,
            assignmentID: assignmentID
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await Gradereview.destroy({
        where: {
            id: id
        }
    });
}
