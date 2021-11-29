const sidModel = require('./sidModel')

const sidService = {
    create: sidObj => sidModel
        .create(sidObj)
        .then(sidInstance => sidInstance)
        .catch(err => {
            console.log(err)
            return err
        }),
    findUserBySidAndClassroomId: (sid, classroomId) => sidModel
        .getUserID(sid, classroomId)
        .then(instance => instance.userID)
        .catch(err => { 
            console.log(err)
            return err
        }),
    findBySidAndClassroomId: (sid, classroomId) => sidModel
        .deleteBySIDAndClassroomID(sid, classroomId)
        .then(instance => instance)
        .catch(err => { 
            console.log(err)
            return err
        }),
}

module.exports = sidService