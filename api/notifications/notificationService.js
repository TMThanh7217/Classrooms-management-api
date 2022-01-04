const notificationModel = require('./notificationModel');

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (notification) => {
    return await notificationModel
        .create(notification)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getWithID = async (id) => {
    return await notificationModel
        .getWithID(id)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.getWithUserID = async (userID) => {
    return await notificationModel
        .getWithUserID(userID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.updateWithID = async (id, title, content) => {
    return await notificationModel
        .updateWithID(id, title, content)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.updateWithUserID = async (userID, title, content) => {
    return await notificationModel
        .updateWithUserID(userID, title, content)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await notificationModel
        .delete(id)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}
