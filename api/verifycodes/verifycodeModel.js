const model = require('../../models');
const VerifyCode = model.VerifyCode;

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (userID, code) => {
    return await VerifyCode.create({
        userID: userID,
        code: code,
        status: 0
    });
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getWithUserID = async (userID) => {
    return await VerifyCode.findOne({
        raw: true,
        where: {
            userID: userID
        },
        attributes: {
            exclude: ['updatedAt']
        }
    });
}

exports.getWithCode = async (code) => {
    return await VerifyCode.findOne({
        raw: true,
        where: {code: code},
        attributes: {
            exclude: ['updatedAt']
        }
    });
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.update = async (userID, code) => {
    return await VerifyCode.update({
        code: code
    }, {
        where: {
            userID: userID
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await VerifyCode.destroy({
        where: {
            id: id
        }
    });
}

exports.deleteByUserID = async (userID) => {
    return await VerifyCode.destroy({
        where: {
            userID: userID
        }
    });
}
