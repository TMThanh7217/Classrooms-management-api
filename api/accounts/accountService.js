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

exports.create = async (account, user) => {
    return await accountModel
        .create(account)
        .then( newAccount => {
            console.log(newAccount.id);
            return newAccount.id;
        })
        .catch(err => (console.log(err)));
}

exports.update = async (account) => {
    return await accountModel
        .update(account, {
            where: {
                id: account.id
            }
        }).then( updatedAccount => {
            console.log(newAccount.id);
            return newAccount.id;
        })
        .catch(err => (console.log(err)));
}