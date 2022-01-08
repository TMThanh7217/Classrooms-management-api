const sidClassroomModel = require('./sid_classroomModel');

exports.create = async (studentSID, classroomID) => {
    return await sidClassroomModel
        .create(studentSID, classroomID)
        .then(result => result)
        .catch(err => {
            console.log(err);
            return err;
        })
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getWithID = async (id) => {
    return await sidClassroomModel
        .getWithID(id)
        .then(result => result)
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.getWithBothKeys = async (studentSID, classroomID) => {
    return await sidClassroomModel
        .getWithBothKeys(studentSID, classroomID)
        .then(result => result)
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.getWithOneKeys = async (key, value) => {
    return await sidClassroomModel
        .getWithOneKeys(key, value)
        .then(result => result)
        .catch(err => {
            console.log(err);
            return err;
        })
}
