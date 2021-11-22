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

//----------------------------------------------------------Update----------------------------------------------------------
exports.update = async (assignment) => {
    return await assignmentModel
    .update(assignment)
    .then(assignment => {
        return assignment;
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