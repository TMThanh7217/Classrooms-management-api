// const classrooms = require('../mock.json');
const classroomModel = require('./classroomModel');

exports.listAllClassroom = async () => {
    // return classrooms;
    return await classroomModel
        .getAllClassroom()
        .then( classrooms => {
            /*console.log("\nClassroom service called here");
            console.log(result);*/
            return classrooms;
        })
        .catch(err => (console.log(err)));
};

exports.detail = async (id) => {
    return await classroomModel
        .getClassroomDetailWithID(id)
        .then( classroomDetail => {
            return classroomDetail;
        })
        .catch(err => (console.log(err)));
};

exports.create = async (classroom) => {
    return await classroomModel
        .createClassroom(classroom)
        .then( classroom => {
            return classroom.id;
        })
        .catch(err => (console.log(err)));
}