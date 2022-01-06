const model = require("../../models");
const Comment = model.Comment;

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (comment) => {
    return await Comment.create({
        authorID: comment.authorID,
        gradeReviewID: comment.gradeReviewID,
        content: comment.content
    });
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getWithID = async (id) => {
    return await Comment.findOne({
        raw: true,
        where: {
            id: id
        },
        attributes: {exclude: ['updatedAt']}
    })
}

exports.getWithAuthorIDAndGradereviewID = async (authorID, gradeReviewID) => {
    return await Comment.findAll({
        raw: true,
        where: {
            authorID: authorID,
            gradeReviewID: gradeReviewID
        },
        attributes: {exclude: ['updatedAt']}
    })
}

exports.getAllWithGradereviewID = async (gradeReviewID) => {
    return await Comment.findAll({
        raw: true,
        where: {
            gradeReviewID: gradeReviewID
        },
        attributes: {exclude: ['updatedAt']}
    })
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.updateWithID = async (id, content) => {
    return await Comment.update({
        content: content
    }, {
        where: {
            id: id
        }
    });
}

exports.updateWithAuthorIDAndGradereviewID = async (authorID, gradeReviewID, content) => {
    return await Comment.update({
        content: content
    }, {
        where: {
            authorID: authorID,
            gradeReviewID: gradeReviewID
        }
    });
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await Comment.destroy({
        where: {
            id: id
        }
    });
}
