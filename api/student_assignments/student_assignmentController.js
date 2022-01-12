const student_assignmentService = require('./student_assignmentService');
const sidService = require('../sid/sidService');
const userService = require('../users/userService');
const accountService = require('../accounts/accountService');

exports.create = async (req, res) => {
    let sid = req.params.sid;
    let classroomId = parseInt(req.params.classroomId);
    let result = await sidService.findBySID(sid);
    if (result) {
        let student_assignment = {
            SID: result.SID,
            assignmentID: parseInt(req.params.assignmentId),
            score: parseFloat(req.body.score).toFixed(2),
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
        let sid = data[i].sid;
        let score = data[i].point;
        /*console.log("sidObj");
        console.log(sidObj);*/

        let result = await sidService.findBySID(sid);
        if (result) {
            console.log('Pass findBySid check');
            // Yep no need to check here, if there is an SID, show it and done
            let student_assignment = await student_assignmentService.getStudentAssignment(sid, assignmentId);
            console.log('student_assignment', student_assignment);
            
            if (student_assignment) {
                updateInfo = {
                    SID: sid,
                    assignmentID: student_assignment.assignmentID,
                    score: score,
                    status: 1, // Think this was to mark the assignment is done. No need for it now
                }

                console.log('updateInfo', updateInfo);
                // This update does not update SID and assignmentID, need these two for where clause though
                let updatedSA = await student_assignmentService.update(updateInfo);
                if (updatedSA) {
                    console.log('Update SA successfully');
                }
                else console.log('Update SA fail');
            }
            else {
                student_assignmentObj = {
                    SID: sid,
                    assignmentID: assignmentId,
                    score: score,
                    status: 1,
                }
                console.log('student_assignmentObj', student_assignmentObj);
                let newSA = await student_assignmentService.create(student_assignmentObj);
                console.log('newSA', newSA);
                if (newSA)
                    console.log('Create new SA successfully');
                else console.log('Create SA fail');
            }
        }
        else {
            console.log(`Cannot find with sid: ${sid}`);
        }
    }
    return res.status(200).json({msg: 'Import grade for this assignment successfully'});
} 

exports.getStudentAssignment = async (req, res) => {
    let sid = req.params.sid;
    let classroomId = parseInt(req.params.classroomId);
    let result = await sidService.findBySID(sid);
    if (result) {
        let student_assignment = {
            SID: result.SID,
            assignmentID: parseInt(req.params.assignmentId),
        }
        let result = await student_assignmentService.getStudentAssignment(student_assignment.SID, student_assignment.assignmentID);
        if (result) {
            return res.status(200).json(result);
        }
        else return res.status(500).json({msg: 'Cannot find result match this SID, assignmentID'});
    }
    else {
        return res.status(404).json({msg: 'This SID does not belong to any user'});
    }
}

// oh boi another fun one to fix
// Currently this do a check if anyone has map with this SID, if not then don't update the score.
exports.updateScore = async (req, res) => {
    let userId = parseInt(req.params.userId);
    let classroomId = parseInt(req.params.classroomId);
    let assignmentId = parseInt(req.params.assignmentId);
    console.log("userId:", userId);
    console.log("classroomId:", classroomId);
    console.log("assignmentId:", assignmentId);

    let result = await sidService.findByUserId(userId);
    if (result) {
        console.log("findByUserId", result);
        let student_assignment = {
            SID: result.SID,
            assignmentID: assignmentId,
            score: parseFloat(req.body.score).toFixed(2),
            status: 1
        }
        /*let updatedSA = await student_assignmentService.update(student_assignment);
        if (updatedSA) {
            console.log("student assignment", student_assignment);
            console.log("updatedSA", updatedSA);
            return res.status(200).json({msg: 'Update successfully'});
        }
        else return res.status(500).json({msg: 'Update fail'});*/
        let oldSA = await student_assignmentService.getStudentAssignment(student_assignment.SID, student_assignment.assignmentID);
        if (oldSA) {
            // update score and status, SID and assignmentID is used for where clause
            let updatedSA = await student_assignmentService.update(student_assignment);
            if (updatedSA) {
                //console.log("student assignment", student_assignment);
                console.log("updatedSA", updatedSA);
                return res.status(200).json({msg: 'Update successfully'});
            }
            else return res.status(500).json({msg: 'Update fail'});
        }
        else {
            // Why do i create a new SA when this is a update function? Wah?
            let newSA = await student_assignmentService.create(student_assignment);
            if (newSA) {
                console.log('newSA: ', newSA.SID, newSA.assignmentID);
                return res.status(200).json({msg: 'Create new SA successfully'});
            }
            else return res.status(500).json({msg: 'Create new SA fail'});
        }
    }
    else {
        return res.status(404).json({msg: 'This SID does not belong to any user'});
    }
}

// Copy paste from above, this one need the SID from req.parms
// Change the function name later
exports.updateScoreUsingSID = async (req, res) => {
    let SID = req.body.SID;
    let classroomId = parseInt(req.params.classroomId);
    let assignmentId = parseInt(req.params.assignmentId);
    let result = await sidService.findBySID(SID, classroomId);
    console.log("SID:", SID);
    console.log("classroomId:", classroomId);
    console.log("assignmentId:", assignmentId);
    console.log("result", result);
    if (result) {
        let student_assignment = {
            SID: result.SID,
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
        let oldSA = await student_assignmentService.getStudentAssignment(student_assignment.SID, student_assignment.assignmentID);
        if (oldSA) {
            // update score and status, SID and assignmentID is used for where clause
            let updatedSA = await student_assignmentService.update(student_assignment);
            if (updatedSA) {
                //console.log("student assignment", student_assignment);
                console.log("updatedSA", updatedSA);
                return res.status(200).json({msg: 'Update successfully'});
            }
            else return res.status(500).json({msg: 'Update fail'});
        }
        else {
            // Why do i create a new SA when this is a update function? Wah?
            let newSA = await student_assignmentService.create(student_assignment);
            if (newSA) {
                console.log('newSA: ', newSA.SID, newSA.assignmentID);
                return res.status(200).json({msg: 'Create new SA successfully'});
            }
            else return res.status(500).json({msg: 'Create new SA fail'});
        }
    }
    else {
        return res.status(404).json({msg: 'This SID does not belong to any user'});
    }
}

exports.delete = async (req, res) => {
    let sid = req.params.sid;
    let classroomId = parseInt(req.params.classroomId);
    let result = await sidService.findBySID(sid, classroomId);
    if (result) {
        let student_assignment = {
            SID: result.SID,
            assignmentID: parseInt(req.params.assignmentId),
        }
        let result = await student_assignmentService.delete(student_assignment.SID, student_assignment.assignmentID);
        if (result) {
            return res.status(200).json({msg: 'Delete successfully'});
        }
        else return res.status(500).json({msg: 'Delete fail'});
    }
    else {
        return res.status(404).json({msg: 'This SID does not belong to any user'});
    }
}
