const student_assignmentService = require('./student_assignmentService');
const sidService = require('../sid/sidService');
const userService = require('../users/userService');

exports.create = async (req, res) => {
    let sid = parseInt(req.params.sid);
    let classroomId = parseInt(req.params.classroomId);
    let result = await sidService.findBySidAndClassroomId(sid, classroomId);
    if (result) {
        let student_assignment = {
            userID: result.userID,
            assignmentID: parseInt(req.params.assignmentId),
            score: parseFloat(req.body.score).toFixed(1),
            status: 1
        }
        let newSA = await student_assignmentService.create(student_assignment);
        if (newSA) {
            return res.status(200).json(newSA);
        }
        else return res.status(500).json({msg: 'Can not create new student_assignment'});
    }
    else {
        return res.status(404).json({msg: 'This SID does not belong to any user'});
    }
}

exports.importGradeForAnAssignment = async (req, res) => {
    let classroomId = parseInt(req.params.classroomId);
    let assignmentId = parseInt(req.params.assignmentId);
    let data = req.body.data;
    console.log("data");
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let sid = parseInt(data[i].sid);
        let score = data[i].point;
        /*console.log("sidObj");
        console.log(sidObj);*/

        let result = await sidService.findBySidAndClassroomId(sid, classroomId);
        if (result) {
            console.log('Pass findBySidAndClassroomId check');
            let user = await userService.getUserWithID(result.userID);
            if (user) {
                console.log('Pass getUserWithID check');
                let student_assignment = await student_assignmentService.getStudentAssignment(user.id, assignmentId);
                if (student_assignment) {
                    updateInfo = {
                        userID: student_assignment.userID,
                        assignmentID: student_assignment.assignmentID,
                        score: score,
                        status: 1,
                    }
                    let updatedSA = await student_assignmentService.update(updateInfo);
                    if (updatedSA) {
                        console.log('Update SA successfully');
                    }
                    else console.log('Update SA fail');
                }
                else {
                    student_assignmentObj = {
                        userID: user.id,
                        assignmentID: assignmentId,
                        score: score,
                        status: 1,
                    }
                    let newSA = await student_assignmentService.create(student_assignmentObj);
                    if (newSA)
                        console.log('Create new SA successfully');
                    else console.log('Create SA fail');
                }
            }
        }
    }
    return res.status(200).json({msg: 'Import grade for this assignment successfully'});
} 

exports.getStudentAssignment = async (req, res) => {
    let sid = parseInt(req.params.sid);
    let classroomId = parseInt(req.params.classroomId);
    let result = await sidService.findBySidAndClassroomId(sid, classroomId);
    if (result) {
        let student_assignment = {
            userID: result.userID,
            assignmentID: parseInt(req.params.assignmentId),
        }
        let result = await student_assignmentService.getStudentAssignment(student_assignment.userID, student_assignment.assignmentID);
        if (result) {
            return res.status(200).json(result);
        }
        else return res.status(500).json({msg: 'Cannot find result match this userID, assignmentID'});
    }
    else {
        return res.status(404).json({msg: 'This SID does not belong to any user'});
    }
}

exports.updateScore = async (req, res) => {
    let userId = parseInt(req.params.userId);
    let classroomId = parseInt(req.params.classroomId);
    let assignmentId = parseInt(req.params.assignmentId);
    let result = await sidService.findByUserIDAndClassroomID(userId, classroomId);
    /*console.log("userId:", userId);
    console.log("classroomId:", classroomId);
    console.log("assignmentId:", assignmentId);*/
    if (result) {
        let student_assignment = {
            userID: result.userID,
            assignmentID: assignmentId,
            score: parseFloat(req.body.score),
            status: 1
        }
        /*let updatedSA = await student_assignmentService.update(student_assignment);
        if (updatedSA) {
            console.log("student assignment", student_assignment);
            console.log("updatedSA", updatedSA);
            return res.status(200).json({msg: 'Update successfully'});
        }
        else return res.status(500).json({msg: 'Update fail'});*/
        let oldSA = await student_assignmentService.getStudentAssignment(student_assignment.userID, student_assignment.assignmentID);
        if (oldSA) {
            let updatedSA = await student_assignmentService.update(student_assignment);
            if (updatedSA) {
                //console.log("student assignment", student_assignment);
                console.log("updatedSA", updatedSA);
                return res.status(200).json({msg: 'Update successfully'});
            }
            else return res.status(500).json({msg: 'Update fail'});
        }
        else {
            let newSA = await student_assignmentService.create(student_assignment);
            if (newSA) {
                console.log('newSA: ', newSA.userID, newSA.assignmentID);
                return res.status(200).json({msg: 'Create successfully'});
            }
            else return res.status(500).json({msg: 'Create fail'});
        }
    }
    else {
        return res.status(404).json({msg: 'This SID does not belong to any user'});
    }
}

exports.delete = async (req, res) => {
    let sid = parseInt(req.params.sid);
    let classroomId = parseInt(req.params.classroomId);
    let result = await sidService.findBySidAndClassroomId(sid, classroomId);
    if (result) {
        let student_assignment = {
            userID: result.userID,
            assignmentID: parseInt(req.params.assignmentId),
        }
        let result = await student_assignmentService.delete(student_assignment.userID, student_assignment.assignmentID);
        if (result) {
            return res.status(200).json({msg: 'Delete successfully'});
        }
        else return res.status(500).json({msg: 'Delete fail'});
    }
    else {
        return res.status(404).json({msg: 'This SID does not belong to any user'});
    }
}
