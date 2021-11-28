const model = require("../../models");
const SID = model.SID;
const User = model.User;

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (SIDObj) => {
    return await SID.create({
        SID: SIDObj.SID,
        classroomID: SIDObj.classroomID,
        userID: SIDObj.userID
    });
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getUserID = async (Sid, clasroomID) => {
    return await SID.findOne({
        where: {
            SID: Sid,
            classroomID: clasroomID
        },
        attributes: ['userID']
    })
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.updateUserID = async (SIDObj) => {
    return await SID.update({
        userID: SIDObj.userID,
        where: {
            SID: SIDObj.SID,
            classroomID: SIDObj.clasroomID
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await SID.destroy({
        where: {
            id: id
        }
    });
}

exports.delete = async (Sid) => {
    return await SID.destroy({
        where: {
            SID: Sid
        }
    });
}

exports.delete = async (Sid, clasroomID) => {
    return await SID.destroy({
        where: {
            SID: Sid,
            clasroomID: clasroomID
        }
    });
}

exports.delete = async (userID, clasroomID) => {
    return await SID.destroy({
        where: {
            userID: userID,
            clasroomID: clasroomID
        }
    });
}
