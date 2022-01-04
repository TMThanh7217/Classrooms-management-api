const assignmentService = require('./assignmentService');

//----------------------------------------------------------Create----------------------------------------------------------
exports.create = async (req, res) => {
    let today = new Date();
    let assignment = {
        classroomID: parseInt(req.params.classroomId),
        name: req.body.name,	
        maxPoint: req.body.maxPoint,
        description: req.body.description,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        position: today.getHours() + today.getMinutes() + today.getSeconds(),
    };

    // for in async is not really a good idea : (
    /*for (attribute in assignment)
        if (attribute == '')
            return res.status(400).json({msg: 'Missing attribute'});*/
    if (!assignment.classroomID || !assignment.name || !assignment.maxPoint || 
        !assignment.start_time || !assignment.end_time)
        return res.status(400).json({msg: 'Missing attribute'});

    let oldAssignment = await assignmentService
                                .getAssignmentWithNameAndClassroomID(assignment.name, assignment.classroomID);

    if (oldAssignment) {
        console.log(oldAssignment)
        return res.status(409).json({msg: 'Assignment with the same name has already existed in this classroom'});
    }
    // await work properly i think
    /*assignmentService.countAssignmentInClassroom(assignment.classroomID)
        .then(assignmentNumber => {
            assignment.position = assignmentNumber + 1;
            assignmentService.create(assignment)
            .then(assignmentID => {
                if (assignmentID)
                    return res.status(200).json({msg: 'Assignment created', id: assignmentID});
                else return res.status(500).json({msg: 'Cannot create new assignment'});
            })
        })*/
    
    assignmentService.create(assignment)
        .then(assignmentID => {
            if (assignmentID)
                return res.status(200).json({msg: 'Assignment created', id: assignmentID});
            else return res.status(500).json({msg: 'Cannot create new assignment'});
        })
};

//----------------------------------------------------------Read----------------------------------------------------------
// id cannot be duplicate
exports.getAssignmentWithID = async (req, res) => {
    let id = parseInt(req.body.id);

    assignmentService.getAssignmentWithID(id)
        .then(assignment => {
            if (assignment)
                return res.status(200).json(assignment);
            else return res.status(404).json({msg: 'Cannot find any assignment with the given id'})
        })
}

// assingment name in a class cannot be duplicate
exports.getAssignmentWithNameAndClassroomID = async (req, res) => {
    let name = req.body.name;
    let classroomID = parseInt(req.body.classroomID);

    assignmentService.getAssignmentWithNameAndClassroomID(name,classroomID)
        .then(assignment => {
            if (assignment)
                return res.status(200).json(assignment);
            else return res.status(404).json({msg: 'Cannot find any assignment'});
        })
}

// get all assignment in a classroom
exports.getAssignmentWithClassroomID = async (req, res) => {
    let classroomID = parseInt(req.params.classroomId);
    
    assignmentService.getAssignmentWithClassroomID(classroomID)
        .then(assignmentList => {
            if (assignmentList)
                return res.status(200).json(assignmentList);
            else return res.status(404).json({msg: 'Cannot find any assignment'});
        })
}

// ignore this
exports.total = async (req, res) => {
    let total = await assignmentService.countAssignmentInClassroom(parseInt(req.body.classroomID));
    if (total) 
        return res.status(200).json(total);
    else return res.stauts(404).json({msg: 'lmao'});
}

//----------------------------------------------------------Update----------------------------------------------------------
exports.update = async (req, res) => {
    let assignment = {
        //classroomID: parseInt(req.body.classroomID),
        id: parseInt(req.params.assignmentId),
        classroomID: parseInt(req.params.classroomId),
        name: req.body.name,
    }

    // if this doesn't work properly then then?
    // properly could just use id but oh well
    let oldAssignment = await assignmentService.getAssignmentWithID(assignment.id);
    console.log("req body", req.body);
    console.log("assignment outside get check", assignment);
    if (oldAssignment) {
        console.log("oldAssignment", oldAssignment);
        // if terrary does not affect async switch
        // '' or null? no idea check this again later
        if (req.body.name != '')
            assignment.name =  req.body.name;
        else assignment.name = oldAssignment.name;

        if (req.body.maxPoint != '')
            assignment.maxPoint = req.body.maxPoint;
        else assignment.maxPoint = oldAssignment.maxPoint;
        
        if (req.body.description != '')
            assignment.description = req.body.description;
        else assignment.description = oldAssignment.description;

        assignment.start_time = oldAssignment.start_time;
        assignment.end_time = oldAssignment.end_time;

        if (req.body.position != '' || req.body.position == 0)
            assignment.position = parseInt(req.body.position);
        else assignment.position = oldAssignment.position;

        if (req.body.finalize != '' || req.body.finalize == 0) {
            console.log("yes");
            assignment.finalize = parseInt(req.body.finalize);
        }
        else {
            console.log("0 pass the != '' check");
            assignment.finalize = oldAssignment.finalize;
        }
        //assignment.finalize = parseInt(req.body.finalize);
        console.log("assignment inside get check", assignment);
        /*
        req.body.maxPoint != '' ? assignment.maxPoint = req.body.maxPoint : assignment.maxPoint = oldAssignment.maxPoint;
        req.body.description != '' ? assignment.description = req.body.description : assignment.description = oldAssignment.description;
        
        //req.body.start_time != '' ? assignment.start_time = req.body.start_time : assignment.start_time = oldAssignment.start_time;
        //req.body.end_time != '' ? assignment.end_time = req.body.end_time : assignment.end_time = oldAssignment.end_time;
        
        // cannot change start time and end time of an assignment for now
        assignment.start_time = oldAssignment.start_time;
        assignment.end_time = oldAssignment.end_time;
        // position use for interactive UI
        req.body.position != '' ? assignment.position = req.body.position : assignment.position = oldAssignment.position;
        */
        assignmentService.update(assignment)
            .then(result => {
                if (result)
                    return res.status(200).json(result);
                else return res.status(500).json({msg: 'Cannot update assignment'});
            })
    }
    else return res.status(404).json({msg: 'Cannot find this assignment'});
}

exports.updateAssignmentPosition = async (req, res) => {
    /*
        let id = parseInt(req.params.asignmentId);
        let classroomID = parseInt(req.params.classroomId);
        let position = parseInt(req.params.position)

        assignmentService.updateAssignmentPosition(id, classroomID, position)
            .then(result => {
                if (result)
                    return res.status(200).json(result);
                else return res.status(500).json({msg: 'Cannot update assignment'});
            })
    */

    console.log("test update assignment pos")
    let assignmentList = req.body;
    /*console.log(assignmentList.length);
    console.log(assignmentList);
    console.log(assignmentList[0].description);*/
    //for (let i = 0; i < assignmentList.length)

    for (let i = 0; i < assignmentList.length; i++) {
        // async handle using then
        /*
        assignmentService.getAssignmentWithID(parseInt(assignmentList[i].id))
            .then(assignment => {
                //console.log(assignment);
                if (assignment) {
                    if (assignment.position != i + 1) {
                        console.log('position:')
                        console.log(assignment.position);
                        console.log('i:');
                        console.log(i + 1);
                        assignmentService
                            .updateAssignmentPosition(assignment.id, assignment.classroomID, assignment.position)
                            .then(result => {
                                if (!result)
                                    return res.status(500).json({msg: "Cannot update assignment's position"});
                            })
                    }
                }
                else return res.status(500).json({msg: 'Cannot find assignment with the given id'});
            })
        */
        
        //async handle using await
        console.log("In loop");
        let assignment = await assignmentService.getAssignmentWithID(parseInt(assignmentList[i].id))
        if (assignment) {
            if (assignment.position != i + 1) {
                console.log('position:')
                console.log(assignment.position);
                console.log('i:');
                console.log(i + 1);
                // oh would you look at that, instead of using i + 1, i use assignment.position instead
                // yikes best 1hr wasted of my life
                let result = await assignmentService
                    .updateAssignmentPosition(assignment.id, assignment.classroomID, i + 1)
                if (!result)
                    return res.status(500).json({msg: "Cannot update assignment's position"});
                else {
                    console.log('result:');
                    console.log(result);
                }
            }
        }
        else return res.status(500).json({msg: 'Cannot find assignment with the given id'});
    }
    console.log('Out loop');
    res.status(200).json({msg: 'update assignment pos success'});
}

exports.setFinalize = async (req, res) => {
    let assignment = {
        id: parseInt(req.params.assignmentId),
        classroomID: parseInt(req.params.classroomId),
        //name: req.body.name,
    }
    
    let finalize = parseInt(req.body.finalize); // 0 = not finalize, 1 = finalize

    assignmentService.updateFinalize(assignment.id, assignment.classroomID, finalize)
        .then(result => {
            if (result) 
                return res.status(200).json(result);
            else return res.status(500).json({msg: 'Cannot finalize this grade composition'});
            }) 
}

//----------------------------------------------------------Delete----------------------------------------------------------
// may need to check this later
exports.delete = async (req, res) => {
    let id = parseInt(req.params.assignmentId);
    let name = req.body.name;
    let classroomID = parseInt(req.params.classroomId);

    assignmentService.delete(id, name, classroomID)
        .then(result => {
            if (result)
                return res.status(200).json({msg: 'Delete successfully'});
            else return res.status(500).json({msg: 'Cannot delete this assignment'});
        })
}
