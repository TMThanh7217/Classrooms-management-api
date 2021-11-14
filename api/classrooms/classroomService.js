// const classrooms = require('../mock.json');
const classroomModel = require('./classroomModel');

exports.listAllClassroom = async () => {
    // return classrooms;
    return await classroomModel
        .getAllClassroom()
        .then(result => {
            /*console.log("\nClassroom service called here");
            console.log(result);*/
            return result;
        })
        .catch(err => (console.log(err)));
};

exports.detail = async (id) => {
    return await classroomModel
        .getClassroomDetailWithID(id)
        .then(result => {
            return result;
        })
        .catch(err => (console.log(err)));
};

exports.create = (classroom) => {
    classroom.id = classrooms.length + 1;
    classrooms.push(classroom);
    return classroom.id;
}