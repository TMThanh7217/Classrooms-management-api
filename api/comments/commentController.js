const commentService = require('./commentService');

exports.create = async (req, res) => {
    let comment = {
        authorID: parseInt(req.body.authorID),
        gradeReviewID: parseInt(req.body.gradeReviewID),
        content: req.body.content
    };

    let newComment = await commentService.create(comment);
    if (newComment)
        return res.status(200).json({msg: 'Create new comment successfully'});
    else return res.status(500).json({msg: 'Cannot create new comment'});
}
