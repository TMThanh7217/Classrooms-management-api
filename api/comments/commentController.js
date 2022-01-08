const commentService = require('./commentService');

exports.create = async (req, res) => {
    let comment = {
        authorID: parseInt(req.body.authorID),
        gradeReviewID: parseInt(req.body.gradeReviewID),
        content: req.body.content
    };
    console.log('--------', comment)
    let newComment = await commentService.create(comment);
    if (newComment)
        return res.status(200).json({msg: 'Create new comment successfully'});
    else return res.status(500).json({msg: 'Cannot create new comment'});
}

exports.getAllWithGradereviewID = async (req, res) => {
    let gradereviewID = parseInt(req.params.gradeReviewId);
    console.log("gradereviewID", gradereviewID);
    let commentList = await commentService.getAllWithGradereviewID(gradereviewID);
    if (commentList) {
        console.log("commentList", commentList);
        return res.status(200).json(commentList);
    }
    else return res.status(500).json({msg: 'Cannot find comment with this gradereviewID'});
}
