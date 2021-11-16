const model = require('../../models');
const UserClassroom = model.UserClassroom;

exports.checkUserCode = async (userID, classroomID, userCode) => {
    return await UserClassroom.findOne({
        raw: true,
        where: {
            userID: userID,
            classroomID: classroomID,
            userCode: userCode
        }
    });
}
