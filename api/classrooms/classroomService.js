const classrooms = require('../mock.json');

exports.list = () => classrooms;

exports.detail = (id) => classrooms.find(classroom => classroom.id === id);

exports.create = (classroom) => {
    classroom.id = classrooms.length + 1;
    classrooms.push(classroom);
    return classroom.id;
}