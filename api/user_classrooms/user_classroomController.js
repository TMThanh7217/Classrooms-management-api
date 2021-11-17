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
                    else return res.status(404).json({err: 'Can not add user to classroom'});
                })
            }
            return res.status(409).json({err: 'User is already in this classroom'});
        })
}

exports.updateUserCode = async (req, res) => {
    user_classroomService.getUserCode(req.body.userID, req.body.classroomID, req.body.userCode)
        .then((userCode) => { 
            if (!userCode) {
                user_classroomService.updateUserCode(req.body.userID, req.body.classroomID, req.body.userCode)
                .then(result => {
                    if (result)
                        return res.status(200).json(result);
                    else return res.status(404).json({err: 'Can not update userCode'});
                })
            }
            return res.status(409).json({err: 'User already has usercode in this classroom'});
        })
};
