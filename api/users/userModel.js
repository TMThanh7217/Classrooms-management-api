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
            id: id
        },
        attributes: { 
            exclude: ['createdAt', 'updatedAt']
        },
        raw: true
    });
}

exports.getUserWithEmail = async (email) => {
    return await User.findOne({
        raw: true,
        where: {
            email: email
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
}

exports.getAllUserWithClassroomID = async (classroomID) => {
    return await User.findAll({
        include: [{
            model: Classroom,
            where: {
                id: classroomID
            },
        }],
        raw: true
    })
}

exports.getAllUser = async () => {
    return await User.findAll({
        raw: true,
        attributes: { 
            exclude: ['createdAt', 'updatedAt']
        },
    })
}

//----------------------------------------------------------Update----------------------------------------------------------
// Use this to update user info
exports.update = async (user) => {
    /*console.log("model call");
    console.log(user)*/
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