const classoomService = require('../classrooms/classroomService');
const userService = require('../users/userService');
const user_classroomService = require('../user_classrooms/user_classroomService');

exports.checkAllRole = async (req, res, next) => {
    console.log('Checking user jwt');
    console.log(req.user)
    let classroomID = parseInt(req.params.id) || parseInt(req.params.classroomId); // be mindfull about which parameter in req hold classroom id
    /*console.log("Classroom id here: ");
    console.log(classroomID);*/
    let userID = req.user.userID;
    await user_classroomService.getRole(userID, classroomID)
        .then(result => {
            if (result)
                next();
            else res.status(500).json({msg: 'Check authorization fail'});
        })
}

exports.checkStudentRole = async (req, res, next) => {
    console.log('Checking user jwt');
    console.log(req.user)
    let classroomID = parseInt(req.params.id); // be mindfull about which parameter in req hold classroom id
    /*console.log("Classroom id here: ");
    console.log(classroomID);*/
    let userID = req.user.userID
    await user_classroomService.getRole(userID, classroomID)
        .then(result => {
            if (result.role == 2)
                next();
            else res.status(500).json({msg: 'Check authorization fail'});
        })
}

exports.checkTeacherRole = async (req, res, next) => {
    console.log('Checking user jwt');
    console.log(req.user)
    // be mindfull about which parameter in req hold classroom id
    let classroomID = parseInt(req.params.id) || parseInt(req.params.classroomId);
    console.log("Classroom id here: ");
    console.log(classroomID);
    let userID = req.user.userID
    await user_classroomService.getRole(userID, classroomID)
        .then(result => {
            console.log(result);
            if (result.role == 0 || result.role == 1)
                next();
            else res.status(500).json({msg: 'Check authorization fail'});
        })
}
