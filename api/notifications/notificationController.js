const notificationService = require('./notificationService');

exports.create = async (req, res) => {
    let notification = {
        title: req.body.title,
        content: req.body.content,
        userID: parseInt(req.body.userID)
    }

    console.log('notification', notification);

    let newNotification = await notificationService.create(notification);
    if (newNotification)
        return res.status(200).json({msg: 'Create new notification successfully'});
    else return res.status(500).json({msg: 'Cannot create new notification'});
};
