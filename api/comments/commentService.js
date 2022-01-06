const commentModel = require('./commentModel');

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (comment) => {
    return await commentModel
        .create(comment)
        .then(newComment => {
            return newComment;
        })
        .catch(err => console.log(err));
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getWithID = async (id) => {
    return await commentModel
        .getWithID(id)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.getWithAuthorIDAndGradereviewID = async (authorID, gradeReviewID) => {
    return await commentModel
        .getWithAuthorIDAndGradereviewID(authorID, gradeReviewID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.getAllWithGradereviewID = async (gradeReviewID) => {
    return await commentModel
        .getAllWithGradereviewID(gradeReviewID)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.updateWithID = async (id, content) => {
    return await commentModel
        .updateWithID(id, content)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

exports.updateWithAuthorIDAndGradereviewID = async (authorID, gradeReviewID, content) => {
    return await commentModel
        .updateWithAuthorIDAndGradereviewID(authorID, gradeReviewID, content)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}

//----------------------------------------------------------Delete----------------------------------------------------------
exports.delete = async (id) => {
    return await commentModel
        .delete(id)
        .then(result => {
            return result;
        })
        .catch(err => console.log(err));
}
