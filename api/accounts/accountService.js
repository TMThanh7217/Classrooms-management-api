const accountModel = require('./accountModel');

exports.create = async (account) => {
    return await accountModel
        .create(account)
        .then( newAccount => {
            return newAccount.id
        })
        .catch(err => (console.log(err)));
}
