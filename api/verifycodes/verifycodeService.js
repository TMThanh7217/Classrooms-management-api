const verifycodeModel = require('./verifycodeModel');

exports.create = async (userID, code) => {
    return await verifycodeModel
        .create(userID, code)
        .then(result => {
            console.log(result);
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getWithUserID = async (userID) => {
    return await verifycodeModel
        .getWithUserID(userID)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getWithCode = async (code) => {
    return await verifycodeModel
        .getWithCode(code)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        })
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.update = async (userID, code) => {
    return await verifycodeModel
        .update(userID, code)
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        })
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await verifycodeModel
        .delete(id)
        .then(result => result)
        .catch(err => {
            console.log(err);
        })
}

exports.deleteByUserID = async (userID) => {
    return await verifycodeModel
        .deleteByUserID(userID)
        .then(result => result)
        .catch(err => {
            console.log(err);
        })
}
