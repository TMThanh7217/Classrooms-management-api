const model = require('../../models');
const User = model.User;
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../models');

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
    // return await User.findOne({
    //     where: {
    //         id: id
    //     },
    //     attributes: { 
    //         exclude: ['updatedAt']
    //     },
    //     raw: true
    // });
    return await model.sequelize.query(
        `
            SELECT s.SID, u.*, a.role
            FROM Users AS u LEFT JOIN SIDs AS s ON(u.id = s.userID) LEFT JOIN Accounts AS a ON (a.userID = u.id)
            WHERE u.id = :userId
        `,{
            type: QueryTypes.SELECT,
            replacements: {
                userId: id
            }
        }
    )
}

exports.getUserWithEmail = async (email) => {
    return await User.findOne({
        raw: true,
        where: {
            email: email
        },
        attributes: {
            exclude: ['updatedAt']
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
            exclude: ['updatedAt']
        },
    })
}

exports.getAllUserInfoAccountWithRole = async (role) => {
    return await sequelize.query(
        acountId, username, email, name, createdAt, role, userId 
        `SELECT a.id as accountId, a.username, a.userId, a.role, a.createdAt, u.name, u.dob, u.email, u.sex
        FROM Users as u JOIN Accounts as a ON (u.id = a.userId)
        WHERE a.role = :role`,
        {
            replacements: { role: role },
            type: QueryTypes.SELECT
        }
    )
}

exports.getAllUserInClassroomWithRole = async (classroomID, role) => {
    return await sequelize.query(
        `
        SELECT u.*, a.role
        FROM Users AS u
        LEFT JOIN UserClassrooms AS uc ON (u.id = uc.userID)
        LEFT JOIN Accounts AS a ON (a.userID = u.id)
        WHERE uc.classroomID = :classroomID AND a.role = :role
        `,
        {
            replacements: {
                classroomID: classroomID,
                role: role
            },
            type: QueryTypes.SELECT
        }
    );
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
