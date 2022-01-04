const model = require("../../models");
const Gradereview = model.Gradereview;

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (gradereview) => {
    return await Gradereview.create({
        studentID: gradereview.studentID,
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
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}

exports.getWithStudentIDAndAssignmentID = async (studentID, assignmentID) => {
    return await Gradereview.findOne({
        raw: true,
        where: {
            studentID: studentID,
            assignmentID: assignmentID
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
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

exports.updateWithStudentIDAndAssignmentID = async (studentID, assignmentID, expectGrade, explaination) => {
    return await Gradereview.update({
        expectGrade: expectGrade,
        explaination: explaination
    }, {
        where: {
            studentID: studentID,
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
