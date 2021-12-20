const model = require('../../models');
const Account = model.Account;

//----------------------------------------------------------Create----------------------------------------------------------
// fix this later
exports.create = async (account) => {
    return await Account.create({
        username: account.username,
        password: account.password,
        userID: account.userID,
        createdDate: account.createdDate,
        googleToken: account.googleToken,
        role: 2
    })
}

exports.createWithRole = async (account, role) => {
    return await Account.create({
        username: account.username,
        password: account.password,
        userID: account.userID,
        createdDate: account.createdDate,
        googleToken: account.googleToken,
        role: role
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
            exclude: ['createdAt', 'updatedAt', 'createdDate']
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
            exclude: ['createdAt', 'updatedAt', 'createdDate']
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
            exclude: ['createdAt', 'updatedAt', 'createdDate']
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

exports.getAllAccount = async () => {
    return await Account.findAll({
        raw: true,
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'createdDate']
        }
    })
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

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await Account.destroy({
        where: {
            id: id
        },
    });
}
