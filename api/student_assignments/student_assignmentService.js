const student_assignmentModel = require('./student_assignmentModel');

exports.create = async (student_assignment) => {
    return await student_assignmentModel
        .create(student_assignment)
        .then(newStudentAssignment => {
            return newStudentAssignment;
        })
        .catch(err => console.log(err));
}

exports.getStudentAssignment = async (SID, assignmentID) => {
    return await student_assignmentModel
        .getStudentAssignment(SID, assignmentID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.update = async (student_assignment) => {
    return await student_assignmentModel
        .update(student_assignment)
        .then(result => result)
        .catch(err => console.log(err));
}

exports.delete = async (SID, assignmentID) => {
    return await student_assignmentModel
        .delete(SID, assignmentID)
        .then(result => result)
        .catch(err => console.log(err));
}
