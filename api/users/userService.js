const userModel = require('./userModel');

exports.create = async (user) => {
    return await userModel
        .create(user)
        .then( newUser => {
            return newUser.id
        })
        .catch(err => (console.log(err)));
};


exports.info = async (id) => {
    return await userModel
        .getUserWithID(id)
        .then( account => {
            return account;
        })
        .catch(err => (console.log(err)));
};
