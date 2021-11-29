const model = require("../../models");
const SID = model.SID;
const User = model.User;

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (SIDObj) => {
    return await SID.create({
        SID: SIDObj.SID,
        classroomID: SIDObj.classroomID,
        userID: SIDObj.userID,
        name: SIDObj.name
    });
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getUserID = async (Sid, classroomID) => {
    return await SID.findOne({
        raw: true,
        where: {
            SID: Sid,
            classroomID: classroomID
        },
        attributes: ['userID']
    })
}

exports.getBySID = async sid => {
    return await SID.findOne({
        raw: true,
        where: {
            SID: sid,
        },
    })
}

exports.getByClassroomID = async classroomID => {
    return await SID.findOne({
        raw: true,
        where: {
            classroomID: classroomID,
        },
        attributes: ['SID']
    })
}

exports.getBySIDAndClassroomID = async (SID, classroomID) => {
    return await SID.findOne({
        raw: true,
        where: {
            classroomID: classroomID,
            SID: SID
        },
        attributes: ['SID']
    })
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.updateUserID = async (SIDObj) => {
    return await SID.update({
        userID: SIDObj.userID,
        where: {
            SID: SIDObj.SID,
            classroomID: SIDObj.classroomID
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.deleteByID = async (id) => {
    return await SID.destroy({
        where: {
            id: id
        }
    });
}

exports.deleteBySID = async (Sid) => {
    return await SID.destroy({
        where: {
            SID: Sid
        }
    });
}

exports.deleteBySIDAndClassroomID = async (Sid, classroomID) => {
    return await SID.destroy({
        where: {
            SID: Sid,
            classroomID: classroomID
        }
    });
}

exports.deleteByUserIDAndClassroomID = async (userID, classroomID) => {
    return await SID.destroy({
        where: {
            userID: userID,
            classroomID: classroomID
        }
    });
}
