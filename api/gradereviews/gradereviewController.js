const gradereviewService = require('./gradereviewService');

exports.create = async (req, res) => {
    let gradereview = {
        studentID: parseInt(req.body.studentID),
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
