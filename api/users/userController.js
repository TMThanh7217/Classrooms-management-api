const model = require('../../models');
const User = model.User;

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (user) => {
    return await User.create({
        name: user.name,
        dob: user.dob,
        email: user.email,
        sex: user.sex,
    });
};

//----------------------------------------------------------Read----------------------------------------------------------
// use id from User model
exports.getUserWithID = async (id) => {
    return await User.findOne({
        where: {
            useridID: id
        },
        attributes: { 
            exclude: ['createdAt', 'updatedAt']
        }
    });
}

//----------------------------------------------------------Update----------------------------------------------------------
// Use this to update user info
exports.update = async (user) => {
    return await User.update({
        name: user.name,
        dob: user.dob,
        email: user.email,
        sex: user.sex,
    }, {
        where: {
            id: user.id
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await User.destroy({
        where: {
            id: id
        },
    });
}