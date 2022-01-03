const model = require('../../models');
const StudentAssignment = model.StudentAssignment;

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (student_assignment) => {
    return await StudentAssignment.create({
        SID: student_assignment.SID,
        assignmentID: student_assignment.assignmentID,
        score: student_assignment.score,
        status: student_assignment.status
    });
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getStudentAssignment = async (SID, assignmentID) => {
    return await StudentAssignment.findOne({
        raw: true,
        where: {
            SID: SID,
            assignmentID: assignmentID
        },
        attributes: { excludes: ['updatedAt', 'createdAt'] }
    });
}

exports.getStudentAssignmentWithSID = async (SID) => {
    return await StudentAssignment.findAll({
        raw: true,
        where: {
            SID: SID
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
            SID: student_assignment.SID,
            assignmentID: student_assignment.assignmentID
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (SID, assignmentID) => {
    return await StudentAssignment.destroy({
        where: {
            SID: SID,
            assignmentID: assignmentID
        }
    });
}

exports.deleteWithSID = async (SID) => {
    return await StudentAssignment.destroy({
        where: { 
            SID: SID
        }
    })
}
