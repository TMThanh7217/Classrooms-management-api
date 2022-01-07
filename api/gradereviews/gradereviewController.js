const gradereviewService = require('./gradereviewService');
const assignmentService = require('../assignments/assignmentService');
const sidController = require('../sid/sidController');
const sidService = require('../sid/sidService');

exports.create = async (req, res) => {
    console.log("req.user in gradereview", req.user);
    let userID = parseInt(req.user.userID);
    let classroomID = parseInt(req.params.classroomId);
    console.log("userID", userID);
    console.log("classroomID", classroomID);

    let sidObj = await sidService.findByUserId(userID);
    if (sidObj) {
        let gradereview = {
            senderSID: sidObj.SID,
            assignmentID: parseInt(req.body.assignmentID),
            expectGrade: req.body.expectGrade, // This may cause some problem, may as well debug it later
            explaination: req.body.explaination
        }

        console.log('gradereview', gradereview);
        let oldGradereview = await gradereviewService.getWithSenderSIDAndAssignmentID(gradereview.senderSID, gradereview.assignmentID);
        if (!oldGradereview) {
            let newGradereview = await gradereviewService.create(gradereview);
            if (newGradereview) {
                console.log('Create new gradeview successfully');
                return res.status(200).json({msg: 'Create new gradeview successfully'});
            }
            else {
                console.log('Cannot create new gradeview');
                return res.status(500).json({msg: 'Cannot create new gradeview'});
            }
        }
        else {
            console.log('You have create a grade review for this assignment already');
            return res.status(500).json({msg: 'You have create a grade review for this assignment already'});
        }
    }
};

// For teacher
exports.getAllWithAssignmentID = async (req, res) => {
    let classroomID = parseInt(req.params.classroomId);
    console.log("classroomID", classroomID);

    let assignment = await assignmentService.getAssignmentWithClassroomID(classroomID);
    if (assignment) {
        console.log("assignment", assignment);
        let assignmentIDList = assignment.map(item => item.id);
        console.log("assignmentIDList", assignmentIDList);

        let gradereviewList = [];
        for (let i = 0; i < assignmentIDList.length; i++) {
            // This use findAll
            let gradereview = await gradereviewService.getWithAssignmentID(assignmentIDList[i]);
            if (gradereview) {
                console.log("gradereview", gradereview);
                gradereviewList = gradereviewList.concat(gradereview);
            }
            else console.log('Cannot find gradereview with assignmentID');
        }

        console.log("gradereviewList", gradereviewList);
        return res.status(200).json(gradereviewList);
    }
}

// For student
exports.getWithSenderSIDAndAssignmentID = async (req, res) => {
    let userID = parseInt(req.params.userId);
    let classroomID = parseInt(req.params.classroomId);
    console.log("userID", userID);
    console.log("classroomID", classroomID);

    let sidObj = await sidService.findByUserId(userID);
    if (sidObj) {
        console.log("sidObj", sidObj);
        let assignment = await assignmentService.getAssignmentWithClassroomID(classroomID);
        if (assignment) {
            console.log("assignment", assignment);
            let assignmentIDList = assignment.map(item => item.id);
            console.log("assignmentIDList", assignmentIDList);
    
            let gradereviewList = [];
            for (let i = 0; i < assignmentIDList.length; i++) {
                // This use findOne
                let gradereview = await gradereviewService.getWithSenderSIDAndAssignmentID(sidObj.SID, assignmentIDList[i]);
                if (gradereview) {
                    console.log("gradereview", gradereview);
                    gradereviewList = gradereviewList.push(gradereview);
                }
                else console.log('Cannot find gradereview with this senderSID and assignmentID');
            }
    
            console.log("gradereviewList", gradereviewList);
            return res.status(200).json(gradereviewList);
        }
    }
    else return res.status(500).json({msg: 'Cannot find any gradereview with this userID'});
}

exports.getAllByUserIDAndClassroomID = async (req, res) => {
    // No authenticate called means no req.user, take note
    console.log("req.user in gradereview", req.user);
    let userID = parseInt(req.user.userID);
    let classroomID = parseInt(req.params.classroomId);
    console.log("userID", userID);
    console.log("classroomID", classroomID);

    let gradereview = await gradereviewService.getByUserIDAndClassroomID(userID, classroomID);
    if (gradereview) {
        console.log("gradereview", gradereview);
        return res.status(200).json(gradereview);
    }
    else return res.status(500).json({msg: 'Cannot find any gradereview with this userID, classroomID'});
}
