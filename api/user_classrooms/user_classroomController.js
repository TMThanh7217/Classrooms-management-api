const user_classroomService = require('./user_classroomService');
const accountService = require('../accounts/accountService');
const classroomServicce = require('../classrooms/classroomService');

exports.create = async (req, res) => {
    let user_classroom = {
        userID: parseInt(req.body.userID),
        classroomID: parseInt(req.body.classroomID), //classroomId received from front end
        userCode: ''
    }
    console.log("user_classroom", user_classroom);
    
    user_classroomService
        .findUserInClassroom(user_classroom.userID, user_classroom.classroomID)
        .then((userclassroom) => {
            console.log('aaaaaaaaa',userclassroom) 
            if (!userclassroom) {
                user_classroomService.create(user_classroom) // 2 = Student, default should be this
                .then(result => {
                    if (result)
                        return res.status(200).json(result);
                    else return res.status(500).json({err: 'Can not add user to classroom'});
                })
            }
            //return res.status(409).json({err: 'User is already in this classroom'});
        })
}

exports.getWithUserID = async(req, res) => {
    let userID = parseInt(req.params.userId);
    let query = req.query;
    console.log(query);
    user_classroomService.getWithUserID(userID)
        .then( result => {
            if (result) {
                console.log(result);
                return res.status(200).json(result);
            }
            else return res.status(404).json({msg: 'Cannot find with userID'});
        });
};

/*
exports.getUserCode = async(req, res) => {
    let userID = parseInt(req.body.userID);
    let classroomID = parseInt(req.body.classroomID);
    user_classroomService.getUserCode(userID, classroomID)
        .then((userCode) => { 
            if (userCode)
                return res.status(200).json(userCode);
            else return res.status(500).json({err: 'Can not update userCode'});
        });
}
*/

exports.updateUserCode = async (req, res) => {
    let userID = parseInt(req.body.userID);
    let classroomID = parseInt(req.body.classroomID);
    user_classroomService.getUserCode(userID, classroomID)
        .then((userCode) => { 
            if (!userCode) {
                user_classroomService.updateUserCode(userID, classroomID, req.body.userCode)
                .then(result => {
                    if (result)
                        return res.status(200).json(result);
                    else return res.status(500).json({err: 'Can not update userCode'});
                })
            }
            return res.status(409).json({err: 'This user code has been used in this classroom'});
        })
};

// fuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu hahh. Inhale, exhale, inhale, exhale ...
// Frontend use this in getClassroomsThatUserHasRoleTeacher.
// Look like this was used to get all classrooms that this user has role teacher in those classrooms.
/*exports.findClassroomsOfUserHasRole = async (req, res) => {
    const userId = req.params.userId
    const roles = req.query.roles
    // delete the function in user_classroomService at some point. Find a fix later 
    const instance = await user_classroomService.findClassroomsOfUserHasRole(userId, roles)
    return instance ? 
        res.status(200).json(instance) :
        res.status(500).json({msg: "Unexpected error."})
}*/

// Change the function so that it check the role of req userId fist if they has teacher role. If not return error, if yes return the userclassroom list 
exports.findClassroomsOfUserHasRole = async (req, res) => {
    const userId = req.params.userId
    const roles = req.query.roles
    console.log("roles: ", roles);
    // delete the function in user_classroomService at some point. Find a fix later 
    const instance = await accountService.getAccountWithUserID(userId);
    if (instance) {
        if (instance.role == 1) {
            let result = await user_classroomService.findClassroomsWithUserId(userId);
            console.log("result: ",result);
            return result ? 
                res.status(200).json(result) :
                res.status(500).json({msg: "Unexpected error."})
        }
        else {
            return res.status(500).json({msg: "This user does not has role teacher."});
        }
    }
    else {
        return res.status(500).json({msg: "Cannot find any result match this userId"});
    }
}
