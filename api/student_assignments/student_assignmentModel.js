const model = require('../../models');
const StudentAssignment = model.StudentAssignment;

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (student_assignment) => {
    return await StudentAssignment.create({
        userID: student_assignment.userID,
        assignmentID: student_assignment.assignmentID,
        score: student_assignment.score,
        status: student_assignment.status
    });
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getStudentAssignment = async (userID, assignmentID) => {
    return await StudentAssignment.findOne({
        raw: true,
        where: {
            userID: userID,
            assignmentID: assignmentID
        },
        attributes: { excludes: ['updatedAt', 'createdAt'] }
    });
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.update = async (student_assignment) => {
    return await StudentAssignment.update({
        score: student_assignment.score,
        status: student_assignment.status
    }, {
        where: {
            userID: student_assignment.userID,
            assignmentID: student_assignment.assignmentID
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (userID, assignmentID) => {
    return await StudentAssignment.destroy({
        where: {
            userID: userID,
            assignmentID: assignmentID
        }
    });
}
