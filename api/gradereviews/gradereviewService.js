const gradereviewModel = require('./gradereviewModel');

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (gradereview) => {
    return await gradereviewModel
        .create(gradereview)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getWithID = async (id) => {
    return await gradereviewModel
        .getWithID(id)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.getWithSenderSIDAndAssignmentID = async (senderSID, assignmentID) => {
    return await gradereviewModel
        .getWithSenderSIDAndAssignmentID(senderSID, assignmentID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.updateWithID = async (id, expectGrade, explaination) => {
    return await gradereviewModel
        .updateWithID(id, expectGrade, explaination)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.updateWithSenderSIDAndAssignmentID = async (senderSID, assignmentID, expectGrade, explaination) => {
    return await gradereviewModel
        .updateWithSenderSIDAndAssignmentID(senderSID, assignmentID, expectGrade, explaination)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await gradereviewModel
        .delete(id)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}
