const accountModel = require('./accountModel');

exports.info = async (id) => {
   return await accountModel
        .getAccountWithID(id)
        .then( accountInfo => {
            return accountInfo
        })
        .catch(err => (console.log(err)));
}
