const assignmentModel = require('./assignmentModel');

//----------------------------------------------------------Create----------------------------------------------------------
// This only return the id remember
exports.create = async (assignment) => {
    return await assignmentModel
        .create(assignment)
        .then(newAssignment => {
            return newAssignment.id;
        })
        .catch(err => console.log(err));
};

//----------------------------------------------------------Read----------------------------------------------------------
// id cannot be duplicate, technically
exports.getAssignmentWithID = async (id) => {
    return await assignmentModel
        .getAssignmentWithID(id)
        .then(assignment => {
            return assignment;
        })
        .catch(err => console.log(err));
}

// assingment name in a class cannot be duplicate
exports.getAssignmentWithNameAndClassroomID = async (name, classroomID) => {
    return await assignmentModel
        .getAssignmentWithNameAndClassroomID(name, classroomID)
        .then(assignments => {
            return assignments;
        })
        .catch(err => console.log(err));
}

// get all assignment in a classroom
exports.getAssignmentWithClassroomID = async (classroomID) => {
    return await assignmentModel
        .getAssignmentWithClassroomID(classroomID)
        .then(assignment => {
            return assignment;
        })
        .catch(err => console.log(err));
}

// count total assignment in a classroom
exports.countAssignmentInClassroom = async (classroomID) => {
    return await assignmentModel
        .countAssignmentInClassroom(classroomID)
        .then(result => {
            //console.log(result);
            return result;
        })
        .catch(err => console.log(err));
}
//----------------------------------------------------------Update----------------------------------------------------------
exports.update = async (assignment) => {
    return await assignmentModel
        .update(assignment)
        .then(assignment => {
            return assignment;
        })
        .catch(err => console.log(err));
}

exports.updateAssignmentPosition = async (id, classroomID, position) => {
    return await assignmentModel
        .updateAssignmentPosition(id, classroomID, position)
        .then(assignment => {
            return assignment;
        })
        .catch(err => console.log(err));
}

exports.updateFinalize = async (id, classroomID, finalize) => {
    return await assignmentModel
        .updateFinalize(id, classroomID, finalize)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

//----------------------------------------------------------Delete----------------------------------------------------------
// may need to check this later
exports.delete = async (id, name, classroomID) => {
    return await assignmentModel
        .delete(id, name, classroomID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}