const { parse } = require('dotenv');
const gradereviewService = require('./gradereviewService');

exports.create = async (req, res) => {
    let gradereview = {
        senderSID: parseInt(req.body.senderSID),
        assignmentID: parseInt(req.body.assignmentID),
        expectGrade: req.body.expectGrade, // This may cause some problem, may as well debug it later
        explaination: req.body.explaination
    }

    console.log('gradereview', gradereview);

    let newGradereview = await gradereviewService.create(gradereview);
    if (newGradereview)
        return res.status(200).json({msg: 'Create new gradeview successfully'});
    else return res.status(500).json({msg: 'Cannot create new gradeview'});
};

exports.getWithSenderSIDAndAssignmentID = async (req, res) => {
    // Don't know what is in params
    // If it is userID, find SID with it first;
    let senderSID = req.params.senderSID;
    let assignmentID = parseInt(req.params.assignmentID);
    console.log("senderSID", senderSID);
    console.log("assignmentID", assignmentID);
    let gradereview = await gradereviewService.getWithSenderSIDAndAssignmentID(senderSID, assignmentID)
    if (gradereview) {
        console.log("gradereview", gradereview);
        return res.status(200).json(gradereview);
    }
    else return res.status(500).json({msg: 'Cannot find gradereview with this senderSID and assignmentID'});
}
