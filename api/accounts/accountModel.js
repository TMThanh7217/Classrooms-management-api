const model = require('../../models');
const Account = model.Account;
const { QueryTypes } = require('sequelize');

//----------------------------------------------------------Create----------------------------------------------------------
// fix this later
exports.create = async (account) => {
    return await Account.create({
        username: account.username,
        password: account.password,
        userID: account.userID,
        createdDate: account.createdDate,
        googleToken: account.googleToken,
        role: 2,
        status: 0,
        validate: 0
    })
}

exports.createWithRole = async (account, role) => {
    return await Account.create({
        username: account.username,
        password: account.password,
        userID: account.userID,
        createdDate: account.createdDate,
        googleToken: account.googleToken,
        role: role,
        status: 0
    })
}

//----------------------------------------------------------Read----------------------------------------------------------
// user id from Account model
exports.getAccountWithID = async (id) => {
    return await Account.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['updatedAt', 'createdDate']
        },
        raw: true
    });
};

// use userID, one account belong to one user technically *shrug*
exports.getAccountWithUserID = async (userID) => {
    return await Account.findOne({
        where: {
            userID: userID
        },
        attributes: {
            exclude: ['updatedAt', 'createdDate']
        },
        raw: true
    });
};

exports.getAccountWithUsername = async (username) => {
    return await Account.findOne({
        where: {
            username: username
        },
        attributes: {
            exclude: ['updatedAt', 'createdDate']
        },
        raw: true
    });
}

exports.getRoleWithUserID = async (userID) => {
    return await Account.findOne({
        where: {
            userID: userID
        },
        attributes: ['role'],
        raw: true
    });
}

exports.getRoleByPk = async pk => {
    return await Account.findOne({
        where: {
            id: pk
        },
        attributes: ['role'],
        raw: true
    });
}

exports.getAllAccount = async () => {
    return await Account.findAll({
        raw: true,
        attributes: {
            exclude: ['updatedAt', 'createdDate']
        }
    });
}

getAllAccountWithRole = async (role) => {
    return await Account.findAll({
        raw: true,
        where: {
            role: role
        },
        attributes: {
            exclude: ['updatedAt', 'createdDate']
        }
    });
}

exports.getAllJoinedUsers  = async (condition) => {
    let queryOption = {
        type: QueryTypes.SELECT,
    }
    return await model.sequelize.query(
        `SELECT a.id AS accountID, s.SID, a.username, u.name, u.email, a.userID, a.role, a.createdAt, a.status
        FROM Accounts AS a LEFT JOIN Users AS u ON(a.userID = u.id) LEFT JOIN SIDs as s ON(u.id = s.userID)
        WHERE ${condition}`
        ,
        queryOption
    );
}

//----------------------------------------------------------Update----------------------------------------------------------
// fix this later
exports.update = async (account) => {
    return await Account.update({
        username: account.username,
        password: account.password,
        googleToken: account.googleToken
    }, {
        where: {
            id: account.id
        }
    });
}

exports.updateRole = async (account) => {
    return await Account.update({
        role: account.role
    }, {
        where: {
            id: account.id
        }
    });
}

exports.updateStatus = async (id, status) => {
    return await Account.update({
        status: status
    }, {
        where: {
            id: id
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await Account.destroy({
        where: {
            id: id
        },
    });
}
