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
        attributes: ['id', 'name', 'section', 'description']
    })
};