const commentService = require('./commentService');

exports.create = async (req, res) => {
    console.log('req.body in create comment', req.body);
    let comment = {
        authorID: parseInt(req.body.authorID),
        gradeReviewID: parseInt(req.body.gradeReviewID),
        content: req.body.content
    };
    console.log('comment', comment);

    let newComment = await commentService.create(comment);
    if (newComment) {
        console.log('newComment', newComment);
        //return res.status(200).json({msg: 'Create new comment successfully'});
    }
    else { 
        console.log("Cannot create new comment");
        return res.status(500).json({msg: 'Cannot create new comment'});
    }
}

exports.getAllWithGradereviewID = async (req, res) => {
    let gradeReviewID = parseInt(req.params.gradeReviewId);
    console.log("gradeReviewID", gradeReviewID);
    let commentList = await commentService.getAllWithGradereviewID(gradeReviewID);
    if (commentList) {
        console.log("commentList", commentList);
        return res.status(200).json(commentList);
    }
    else return res.status(500).json({msg: 'Cannot find comment with this gradeReviewID'});
}
