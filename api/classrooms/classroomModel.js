const model = require("../../models");
const Classroom = model.Classroom;

//----------------------------------------------------------Create----------------------------------------------------------
// Create a classroom
exports.createClassroom = async (classroom) => {
    return await Classroom.create({
        name: classroom.name,
        section: classroom.section,
        description: classroom.description,
        createdBy: classroom.createdBy
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
        attributes: ['id', 'name', 'section', 'description', 'createdBy']
    });
};

// Look like account store userID, might want to use that. UserClassroom hold userID and classroomID
exports.getAllClassroomWithUserID = async (userID) => {
    return await  Classroom.findAll({
        include: [{
            model: UserClassroom,
            where: {
                userID: userID
            }
        }],
        raw: true,
        attributes: ['id', 'name', 'section', 'description']
    });
};

// Use id of Classroom model for this
exports.getClassroomDetailWithID = async (id) => {
    return await Classroom.findAll({
        raw: true,
        where: {
            id: id
        },
        attributes: ['id', 'name', 'section', 'description', 'createdBy']
    });
};

//----------------------------------------------------------Update----------------------------------------------------------


//----------------------------------------------------------Delete----------------------------------------------------------
// Delete a classroom using id from Classroom model
// Might want to fix this later, idk. In case need to return the deleted row try find with id then delete it
exports.delete = async (id) => {
    return await Classroom.destroy({
        where: {
            id: id
        }
    });
}
