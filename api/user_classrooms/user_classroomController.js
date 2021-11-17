const user_classroomService = require('./user_classroomService');

exports.createWithRole = async (req, res) => {
    let userID = parseInt(req.body.user_classroom.userID);
    let classroomID = parseInt(req.body.user_classroom.classroomID);
    let role = req.body.role;
    user_classroomService
        .findUserInClassroom(userID, classroomID)
        .then((userclassroom) => { 
            if (!userclassroom) {
                user_classroomService.create(parseInt(req.body.user_classroom), role) // 2 = Student, default should be this
                .then(result => {
                    if (result)
                        return res.staus(200).json(result);
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
