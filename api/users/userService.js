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
        .then( userInfo => {
            return userInfo;
        })
        .catch(err => (console.log(err)));
};
