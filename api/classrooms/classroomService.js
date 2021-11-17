// const classrooms = require('../mock.json');
const classroomModel = require('./classroomModel');
const inviteLinkLength = 8;

exports.makeInviteLink = (length) =>{
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.create = async (classroom) => {
    return await classroomModel
        .createClassroom(classroom)
        .then( newClassroom => {
            console.log(newClassroom.id);
            return newClassroom.id;
        })
        .catch(err => (console.log(err)));
}

exports.listAllClassroom = async () => {
    // return classrooms;
    return await classroomModel
        .getAllClassroom()
        .then( classrooms => {
            /*console.log("\nClassroom service called here");
            console.log(result);*/
            return classrooms;
        })
        .catch(err => (console.log(err)));
};

exports.listAllClassroomWithUserID = async (userID) => {
    return await classroomModel
        .getAllClassroomWithUserID(userID)
        .then( classrooms => {
            return classrooms;
        })
        .catch(err => console.log(err));
}

exports.getClassroomDetailWithID = async (id) => {
    return await classroomModel
        .getClassroomDetailWithID(id)
        .then( classroomDetail => {
            return classroomDetail;
        })
        .catch(err => console.log(err));
};

exports.getUserListWithClassroomID = async (id) => {
    return await classroomModel
        .getUserListWithClassroomID(id)
        .then(info => {
            return info;
        })
        .catch(err => console.log(err));
}

exports.getClassroomDetailWithInviteLink = async (inviteLink) => {
    return await classroomModel
        .getClassroomDetailWithInviteLink(inviteLink)
        .then(classroomDetail => {
            return classroomDetail;
        })
        .catch(err => console.log(err));
}