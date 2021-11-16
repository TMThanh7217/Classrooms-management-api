const accountModel = require('./accountModel');

exports.info = async (id) => {
   return await accountModel
        .getAccountWithID(id)
        .then( accountInfo => {
            return accountInfo
        })
        .catch(err => (console.log(err)));
}

exports.getAccountWithUsername = async (username) => {
    return await accountModel
        .getAccountWithUsername(username)
        .then( account => {
            return account
        })
        .catch(err => (console.log(err)));
}

exports.create = async (account) => {
    return await accountModel
        .create(account)
        .then( newAccount => {
            console.log(newAccount.id);
            return newAccount.id;
        })
        .catch(err => (console.log(err)));
}