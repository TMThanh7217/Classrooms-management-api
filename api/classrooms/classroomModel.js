const model = require("../../models");
const Classroom = model.Classroom;

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
    })
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
    })
};

// Use id of Classroom model for this
exports.getClassroomDetailWithID = async (id) => {
    return await Classroom.findAll({
        raw: true,
        where: {
            id: id
        },
        attributes: ['id', 'name', 'section', 'description', 'createdBy']
    })
};

// Create classroom
exports.createClassroom = async (classroom) => {
    return await Classroom.create({
        name: classroom.name,
        section: classroom.section,
        description: classroom.description,
        createdBy: classroom.createdBy
    })
};