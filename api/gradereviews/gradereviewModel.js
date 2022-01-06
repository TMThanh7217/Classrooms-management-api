const model = require("../../models");
const Gradereview = model.Gradereview;

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
