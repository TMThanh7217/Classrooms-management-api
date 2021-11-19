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

exports.getAllUserWithClassroomID = async (classroomID) => {
    return await userModel
        .getAllUserWithClassroomID(classroomID)
        .then( userList => {
            return userList;
        })
        .catch(err => (console.log(err)));
};

exports.getUserWithEmail = async (email) => {
    return await userModel
        .getUserWithEmail(email)
        .then(user => {
            return user;
        })
        .catch(err => console.log(err));
};

exports.listAllUser = async () => {
    return await userModel
        .getAllUser()
        .then( userList => {
            return userList;
        })
        .catch(err => console.log(err));
};

exports.update = async (user) => {
    /*console.log('service call')
    console.log(user);*/
    return await userModel
        .update(user)
        .then(updatedUser => {
            return updatedUser;
        })
        .catch(err => console.log(err));
};
