const model = require("../../models");
const Classroom = model.Classroom;
//const Sequelize = require('sequelize');

//----------------------------------------------------------Create----------------------------------------------------------
// Create a classroom
exports.createClassroom = async (classroom) => {
    return await Classroom.create({
        name: classroom.name,
        section: classroom.section,
        description: classroom.description,
        createdBy: classroom.createdBy,
        inviteLink: classroom.inviteLink
    });
};

//----------------------------------------------------------Read----------------------------------------------------------
exports.getAllClassroom = async () => {
    /*return new Promise((resolve, reject) => {
        Classroom
            .findAll({
                raw: true,
                attributes: ['id', 'name', 'section', 'description']
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    }); */
    return await Classroom.findAll({
        raw: true,
        attributes: ['id', 'name', 'section', 'description', 'createdBy', 'inviteLink']
    });
};

// Look like account store userID, might want to use that. UserClassroom hold userID and classroomID
exports.getAllClassroomWithUserID = async (userID) => {
    return await  Classroom.findAll({
        include: [{
            model: model.User,
            attributes: [],
            where: {
                id: userID
            },
            through: {
                attributes: [] // pass nothing if don't want any other attributes in the UserClassroom model 
            },
        }],
        raw: true,
        nest: true,
        attributes: ['id', 'name', 'section', 'description', 'createdBy', 'inviteLink']
    });
};

// Use id of Classroom model for this
exports.getClassroomDetailWithID = async (id) => {
    return await Classroom.findOne({
        raw: true,
        where: {
            id: id
        },
        attributes: ['id', 'name', 'section', 'description', 'createdBy', 'inviteLink']
    });
};

exports.getClassroomWithInviteLink = async (inviteLink) => {
    return await Classroom.findOne({
        raw: true,
        where: {
            inviteLink: inviteLink
        },
        attributes: {exclude: ['updatedAt', 'createdAt']}
    });
};

exports.getUserListWithClassroomID = async (id) => {
    return await Classroom.findAll({
        include: [{
            model: model.User,
            through: {
                attributes: ['userID', 'classroomID', 'userCode'] // pass nothing if don't want any other attributes in the UserClassroom model 
            },
            attributes: ['id', 'name', 'dob', 'email', 'sex']
            //attributes: [[Sequelize.col('id'), 'user_id'], [Sequelize.col('name'), 'user_name'], 'dob', 'email', 'sex']
        }],
        raw: true,
        nest: true, // very cool option
        where: {
            id: id
        },
        attributes: ['createdBy']
        //attributes: ['id', 'name', 'section', 'description', 'createdBy']
    });
};

//----------------------------------------------------------Update----------------------------------------------------------


//----------------------------------------------------------Delete----------------------------------------------------------
// Delete a classroom using id from Classroom model
// Might want to fix this later, idk. In case need to return the deleted row try find with id first before calling delete
exports.delete = async (id) => {
    return await Classroom.destroy({
        where: {
            id: id
        }
    });
}
