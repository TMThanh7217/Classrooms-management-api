const notificationService = require('./notificationService');

exports.create = async (req, res) => {
    let notification = {
        title: req.body.title,
        content: req.body.content,
        userID: parseInt(req.body.userID)
    }

    console.log('notification', notification);

    let newNotification = await notificationService.create(notification);
    if (newNotification) {
        console.log('newNotification', newNotification);
        return res.status(200).json({msg: 'Create new notification successfully'});
    }
    else return res.status(500).json({msg: 'Cannot create new notification'});
};

exports.getAllWithUserID = async (req, res) => {
    let userID = parseInt(req.user.userID);
    console.log(userID);
    let notiList = await notificationService.getWithUserID(userID);
    if (notiList) {
        console.log('notiList', notiList);
        return res.status(200).json({msg: 'Create new notification successfully'});
    }
    else return res.status(500).json({msg: 'Cannot create new notification'});
}
