const model = require('../../models');
const Assignment = model.Assignment;

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (assignment) => {
    return await Assignment.create({
        classroomID: assignment.classroomID,
        name: assignment.name,	
        maxPoint: assignment.maxPoint,
        description: assignment.description,	
        start_time: assignment.start_time,
        end_time: assignment.end_time,
        position: assignment.position 
    });
};

//----------------------------------------------------------Read----------------------------------------------------------
// id cannot be duplicate
exports.getAssignmentWithID = async (id) => {
    return await Assignment.findOne({
        raw: true,
        where: {
            id: id
        },
        attributes: {
            exclude: ['createdAt, updatedAt']
        }
    })
}

// assingment name in a class cannot be duplicate
exports.getAssignmentWithNameAndClassroomID = async (name, classroomID) => {
    return await Assignment.findOne({
        raw: true,
        where: {
            name: name,
            classroomID: classroomID
        },
        order: [
            ['position', 'DESC'],
        ],
        attributes: {
            exclude: ['createdAt, updatedAt']
        }
    })
}

// get all assignment in a classroom
exports.getAssignmentWithClassroomID = async (classroomID) => {
    return await Assignment.findAll({
        raw: true,
        where: {
            classroomID: classroomID
        },
        order: [
            ['position', 'ASC'],
        ],
        attributes: {
            exclude: ['createdAt, updatedAt']
        }
    })
}

// count total assignment in a classroom
exports.countAssignmentInClassroom = async (classroomID) => {
    return await Assignment.count({
        where: {
            classroomID: classroomID
        }
    })
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.update = async (assignment) => {
    return await Assignment.update({
        name: assignment.name,	
        maxPoint: assignment.maxPoint,
        description: assignment.description,	
        start_time: assignment.start_time,
        end_time: assignment.end_time,
        position: assignment.position
    }, {
        where: {
            id: assignment.id,
            classroomID: assignment.classroomID
        }
    })
}

exports.updateAssignmentPosition = async (id, classroomID, position) => {
    return await Assignment.update({
        position: position
    },{
        where: {
            id: id,
            classroomID: classroomID
        }
    });
}
//----------------------------------------------------------Delete----------------------------------------------------------
// may need to check this later
exports.delete = async (id, name, classroomID) => {
    if (id)
        return await Assignment.destroy({
            where: {
                id: id,
                classroomID: classroomID
            }
        });
    else return await Assignment.destroy({
        where: {
            name: name,
            classroomID: classroomID
        }
    })
}