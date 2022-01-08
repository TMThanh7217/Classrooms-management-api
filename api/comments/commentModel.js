const model = require("../../models");
const Comment = model.Comment;
const { QueryTypes } = require('sequelize')

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
    return await model.sequelize.query(
        `
            SELECT c.*, u.name AS authorName
            FROM Comments AS c LEFT JOIN Users AS u ON (u.id = c.authorID)
            WHERE c.gradeReviewID = :id
            ORDER BY c.createdAt DESC 
        `,{
            type: QueryTypes.SELECT,
            replacements: {
                id: gradeReviewID
            }
        }

    )
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
