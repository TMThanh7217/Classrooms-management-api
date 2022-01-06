const model = require("../../models");
const Notification = model.Notification;

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (notification) => {
    return await Notification.create({
        title: notification.title,
        content: notification.content,
        userID: notification.userID
    });
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getWithID = async (id) => {
    return await Notification.findOne({
        raw: true,
        where: {
            id: id
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}

exports.getWithUserID = async (userID) => {
    return await Notification.findAll({
        raw: true,
        where: {
            userID: userID
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.updateWithID = async (id, title, content) => {
    return await Notification.update({
        title: title,
        content: content
    }, {
        where: {
            id: id
        }
    });
}

exports.updateWithUserID = async (userID, title, content) => {
    return await Notification.update({
        title: title,
        content: content
    }, {
        where: {
            userID: userID
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await Notification.destroy({
        where: {
            id: id
        }
    });
}
