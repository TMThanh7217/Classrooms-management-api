const classoomService = require('../classrooms/classroomService');
const userService = require('../users/userService');
const accountService = require('../accounts/accountService');

exports.checkAllRole = async (req, res, next) => {
    console.log('Checking user jwt');
    console.log(req.user)
    let classroomID = parseInt(req.params.classroomId) || parseInt(req.params.id); // be mindfull about which parameter in req hold classroom id
    /*console.log("Classroom id here: ");
    console.log(classroomID);*/
    let userID = parseInt(req.user.userID); // Oh wow did not parseInt here before. How can this even work?
    await accountService.getRoleWithUserID(userID)
        .then(result => {
            if (result) // does not need to check the role here
                next();
            else res.status(500).json({msg: 'Check authorization fail'});
        })
}

exports.checkStudentRole = async (req, res, next) => {
    console.log('Checking user jwt');
    console.log(req.user)
    let classroomID = parseInt(req.params.classroomId) || parseInt(req.params.id); // be mindfull about which parameter in req hold classroom id
    /*console.log("Classroom id here: ");
    console.log(classroomID);*/
    let userID = parseInt(req.user.userID);  // Also not parseInt here either.
    await accountService.getRoleWithUserID(userID)
        .then(result => {
            // log here later if something went wrong
            if (result.role == 2)
                next();
            else res.status(500).json({msg: 'Check authorization fail'});
        })
}

exports.checkTeacherRole = async (req, res, next) => {
    console.log('Checking user jwt');
    console.log(req.user)
    // be mindfull about which parameter in req hold classroom id
    let classroomID = parseInt(req.params.classroomId) || parseInt(req.params.id);
    console.log("Classroom id here: ");
    console.log(classroomID);
    let userID = parseInt(req.user.userID); // Also here
    await accountService.getRoleWithUserID(userID)
        .then(result => {
            console.log(result);
            if (result.role == 1)
                next();
            else res.status(500).json({msg: 'Check authorization fail'});
        })
}

exports.checkAdminRole = async (req, res, next) => {
    console.log('Checking user jwt');
    console.log(req.user)
    // be mindfull about which parameter in req hold classroom id
    let classroomID = parseInt(req.params.classroomId) || parseInt(req.params.id);
    console.log("Classroom id here: ");
    console.log(classroomID);
    let userID = parseInt(req.user.userID); // Also here
    await accountService.getRoleWithUserID(userID)
        .then(result => {
            console.log(result);
            if (result.role == 0)
                next();
            else res.status(500).json({msg: 'Check authorization fail'});
        })
}
