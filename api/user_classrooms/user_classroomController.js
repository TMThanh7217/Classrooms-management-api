const user_classroomService = require('./user_classroomService');

exports.createWithRole = async (req, res) => {
    let user_classroom = {
        userID: parseInt(req.body.userID),
        classroomID: parseInt(req.body.classroomID),
        role: parseInt(req.body.role), // change this later, default = student 
        userCode: ''
    }
    
    user_classroomService
        .findUserInClassroom(user_classroom.userID, user_classroom.classroomID)
        .then((userclassroom) => {
            console.log('a',userclassroom) 
            if (!userclassroom) {
                user_classroomService.create(user_classroom, user_classroom.role) // 2 = Student, default should be this
                .then(result => {
                    if (result)
                        return res.status(200).json(result);
                    else return res.status(500).json({err: 'Can not add user to classroom'});
                })
            }
            return res.status(409).json({err: 'User is already in this classroom'});
        })
}

exports.getRole = async(req, res) => {
    let userID = parseInt(req.params.userId);
    let classroomID = parseInt(req.params.classroomId);
    user_classroomService.getRole(userID, classroomID)
        .then( result => {
            if (result) {
                /*console.log(result);
                console.log(result.role);*/
                return res.status(200).json(result.role);
            }
            else return res.status(404).json({msg: 'Cannot find the role of this user'});
        });
};

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

exports.findClassroomsOfUserHasRole = async (req, res) => {
    const userId = req.params.userId
    const roles = req.query.roles
    const instance = await user_classroomService.findClassroomsOfUserHasRole(userId, roles)
    return instance ? 
        res.status(200).json(instance) :
        res.status(500).json({msg: "Unexpected error."})
}