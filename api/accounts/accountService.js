const accountModel = require('./accountModel');

exports.listAllAccount = async () => {
    return await accountModel
        .getAllAccount()
        .then( accountList => {
            return accountList;
        })
        .catch(err => console.log(err));
}

exports.info = async (id) => {
   return await accountModel
        .getAccountWithID(id)
        .then( accountInfo => {
            return accountInfo;
        })
        .catch(err => (console.log(err)));
}

exports.getAccountWithID = async (id) => {
    return await accountModel
        .getAccountWithID(id)
        .then( account => {
            return account;
        })
        .catch(err => (console.log(err)));
}

exports.getAccountWithUserID = async (userID) => {
    return await accountModel
        .getAccountWithUserID(userID)
        .then( account => {
            return account;
        })
        .catch(err => (console.log(err)));
}

exports.getAccountWithUsername = async (username) => {
    return await accountModel
        .getAccountWithUsername(username)
        .then( account => {
            return account;
        })
        .catch(err => (console.log(err)));
}

exports.getRoleWithUserID = async (userID) => {
    return await accountModel
        .getRoleWithUserID(userID)
        .then( role => {
            return role;
        })
        .catch(err => (console.log(err)));
}

exports.create = async (account, role) => {
    return await accountModel
        .createWithRole(account, role)
        .then( newAccount => {
            console.log(newAccount.id);
            return newAccount.id;
        })
        .catch(err => (console.log(err)));
}

exports.update = async (account) => {
    return await accountModel
        .update(account)
        .then( updatedAccount => {
            //console.log(updatedAccount.id);
            return updatedAccount.id;
        })
        .catch(err => (console.log(err)));
}

exports.updateStatus = async (id, status) => {
    return await accountModel
        .updateStatus(id, status)
        .then( result => {
            return result;
        })
        .catch(err => (console.log(err)));
}
