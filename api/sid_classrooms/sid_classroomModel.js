const model = require("../../models");
const SIDClassroom = model.SIDClassroom;
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../../models");

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (studentSID, classroomID) => {
    return await SIDClassroom.create({
        studentSID: studentSID,
        classroomID: classroomID
    })
}

//----------------------------------------------------------Read----------------------------------------------------------
exports.getWithID = async (id) => {
    return await SIDClassroom.findOne({
        where: {
            id: id
        },
        attributes: {exclude: ['updatedAt']}
    })
}

exports.getWithBothKeys = async (studentSID, classroomID) => {
    return await SIDClassroom.findOne({
        where: {
            studentSID: studentSID,
            classroomID: classroomID
        },
        attributes: {exclude: ['updatedAt']}
    })
}

exports.getWithOneKeys = async (key, value) => {
    return await sequelize.query(
        `
        SELECT *
        FROM SIDClassrooms
        WHERE ${key} = :value
        `,{
            replacements: {value: value},
            type: QueryTypes.SELECT
        }
    )
}

//----------------------------------------------------------Update----------------------------------------------------------


//----------------------------------------------------------Delete----------------------------------------------------------
