const { update } = require("../accounts/accountModel");
const sidService = require("../sid/sidService")
const userService = require("../users/userService");
const studentAssignmentService = require("../student_assignments/student_assignmentService");
const assignmentService = require("../assignments/assignmentService");
const accountService = require('../accounts/accountService');
const userClassroomService = require('../user_classrooms/user_classroomService');

const sidController = {
    addSID: async (req, res) => {
        let sidObj = {
            sid: req.body.sid,
            classroomID: parseInt(req.body.classroomId ?? req.params.classroomId),
            userID: parseInt(req.body.userID) ?? null,
            name: req.body.name
        };
        console.log("data", sidObj);
        let instance = await sidService.findBySID(sidObj.sid);
        console.log("SID found: ", instance);

        // Check if received SID exist
        if(instance) {
            // The received SID exist already, no need to create a new one
            console.log(instance);
            // Check if SID belong to any user
            let oldSid = await sidService.findByUserId(sidObj.userID);
            console.log("User found", oldSid);
            if (!oldSid) {
                // SID exist but does not belong to any user, call update
                console.log("Fail old SID check");
                // The name may or may not required. Check this later
                const requireFields = ['name', 'sid'];
                const validateAddData = data => requireFields.every(field => Object.keys(data).includes(field));
                let isValid = Object.keys(validateAddData(sidObj));
                if(isValid) {
                    sidService
                        .updateNameAndUserID(sidObj)
                        .then(instance => res.status(200).json({data: instance, msg: "SID was successfully updated."}))
                        .catch(err => res.status(500).json({msg: err}))
                }
                else return res.status(500).json({msg: "Invalid post data."});
            }
            else return res.status(500).json({msg: "This SID is used by another user."});
        }
        else {
            // The received SID does not exist
            // Check if the userID has a SID before
            const foundSID = await sidService.findByUserId(sidObj.userID)
            console.log("found SID", foundSID)
            if(!foundSID) {
                // If not, create a new SID
                const requireFields = ['name', 'sid'];
                const validateAddData = data => requireFields.every(field => Object.keys(data).includes(field));
                let isValid = Object.keys(validateAddData(sidObj));
                if(isValid) {
                    console.log("Call create SID")
                    let newSid = await sidService.create(sidObj);
                    if (newSid) {
                        // If a new SID was created, find all assignment in every classroom and create a new student assignment  
                        /*let userClassroom = await userClassroomService.getWithUserID(parseInt(newSid.userID));
                        //console.log("userClassroom", userClassroom);
                        if (userClassroom) {
                            // Get unique classroomID value only
                            // Use map to get a new array from classroomID then use filter, indexOf to get unique value
                            let classroomIDList = userClassroom.map(item => item.classroomID).filter((ele, index, arr) => (arr.indexOf(ele) == index));
                            console.log("classroomIDList", classroomIDList);
                            let assignmentIDList = [];
                            for (let i = 0; i < classroomIDList.length; i++) {
                                let assignment = await assignmentService.getAssignmentWithClassroomID(classroomIDList[i]);
                                if (assignment)
                                assignmentIDList = assignmentIDList.concat(assignment.map(item => item.id));
                            }
                            assignmentIDList.filter((ele, index, arr) => (arr.indexOf(ele) == index));

                            let studentAssignment = {
                                SID: newSid.SID,
                                score : 0,
                                status: 0
                            }
                            console.log("assignmentIDList", assignmentIDList);
                            for (let i = 0; i < assignmentIDList.length; i++) {
                                studentAssignment.assignmentID = assignmentIDList[i];
                                console.log('studentAssignment', studentAssignment);
                                let oldSA = studentAssignmentService.getStudentAssignmentWithSID(studentAssignment.SID);
                                if (!oldSA) {
                                    let newSA = await studentAssignmentService.create(studentAssignment);
                                    if (newSA) {
                                        console.log('newSA', newSA);
                                    }
                                    else console.log("Cannot create new SA")
                                }
                                else {
                                    let result = await studentAssignmentService.update(studentAssignment);
                                    if (result) {
                                        console.log('Update SA successfully', result);
                                    }
                                    else console.log("Cannot update SA")
                                }
                            }

                            return res.status(200).json({data: instance, msg: "SID was successfully created."})
                        }*/
                        return res.status(200).json({data: instance, msg: "SID was successfully created."})
                    }
                    else return res.status(500).json({msg: "Cannot create new SID"});
                }
                else return res.status(500).json({msg: "Invalid post data."})
            }
            else {
                // If yes, call update. haha update on m:n association funny hah a
                // Update SID in student assignment table first or foreign key constrant fails will happen because yada yada and stuff
                // Okay, to update the existing SID, find every student assignment using this sid first.
                // Then delete all of them and create the new one.
                // Is this dumb? maybe
                // Or
                // Create a new SID obj from the old SID obj with different SID.
                // Then update the student assignment based on the newly created SID obj. Then delete the old SID obj
                
                /*let oldSAList = await studentAssignmentService.getStudentAssignmentWithSID(foundSID.SID); // This use findAll so it return an array
                if (oldSAList) {
                    console.log("oldSAList", oldSAList);
                    for (let i = 0; i < oldSAList.length; i++) {
                        console.log("oldSAList[i]", oldSAList[i]);
                        let result = await studentAssignmentService.deleteWithSID(oldSAList[i].SID);
                        if (result) {
                            let student_assignment = {
                                SID: sidObj.sid,
                                assignmentID: oldSAList[i].assignmentID,
                                score: oldSAList[i].assignmentID,
                                status: oldSAList[i].assignmentID,
                            };
                            // foundSID is an SID object store the old SID
                            let newSidObj = {...foundSID};
                            console.log("newSidObj", newSidObj);

                            console.log("student_assignment", student_assignment);
                            console.log("sidObj", sidObj);

                            newSidObj.SID = sidObj.sid; // yeah ... SID and sid sure hope this doesn't cause some funny haha stuff later.
                            // This shiet cause problem already holy hell. The create in sid need sid not SID.
                            newSidObj.sid = sidObj.sid;
                            console.log("newSidObj", newSidObj);
                            let deleteResult = await sidService.deleteBySID(foundSID.SID);
                            if (deleteResult) {
                                // create a new sid that has the old information of the old sid but the new sid primary key
                                let instance = await sidService.create(newSidObj);
                                // because foreign key funny haha thing, had to create a new sid first before create a new student assignment
                                if (instance) {
                                    let newSA = await studentAssignmentService.create(student_assignment);
                                    if (newSA)
                                        return res.status(200).json({data: instance, msg: "SID was successfully updated."});
                                    else return res.status(500).json({msg: "Some error occured"});
                                }
                            }
                        }
                        else console.log("Yikes");
                    }
                }*/

                let newSidObj = {...foundSID};
                //console.log("newSidObj", newSidObj);
                console.log("sidObj", sidObj);
                newSidObj.sid = sidObj.sid;
                //console.log("newSidObj", newSidObj);
                // delete the SID hold the primary key first, then create a new SID, then update the student assignment
                // delete the parent will delete all the child that has the reference
                /*let deleteResult = await sidService.deleteBySID(foundSID.SID);
                if (deleteResult) {
                    // create a new sid that has the old information of the old sid but the new sid primary key
                    let instance = await sidService.create(newSidObj);
                    // because foreign key funny haha thing, had to create a new sid first before create a new student assignment
                    if (instance) {
                        let newSA = await studentAssignmentService.updateSID(foundSID.SID, newSidObj.sid);
                        if (newSA)
                           return res.status(200).json({data: instance, msg: "SID was successfully updated."});
                        else return res.status(500).json({msg: "Some error occured"});
                    }
                }*/

                // Take 3 to fix this horrendous mess
                // create a new sid that has the old information of the old sid but the new sid primary key
                let instance = await sidService.create(newSidObj);
                // because foreign key funny haha thing, had to create a new sid first before create a new student assignment
                if (instance) {
                    let newSA = await studentAssignmentService.updateSID(foundSID.SID, newSidObj.sid);
                    if (newSA) {
                        let deleteResult = await sidService.deleteBySID(foundSID.SID);
                        if (deleteResult) 
                            return res.status(200).json({data: instance, msg: "SID was successfully updated."});
                    }
                    else return res.status(500).json({msg: "Some error occured"});
                }
            }
        };
    },
    importStudentList: async (req, res) => {
        let data = req.body.data;
        let classroomId = parseInt(req.params.classroomId);
        /*console.log("classroomId: " + classroomId);
        console.log("data");
        console.log(data);*/
        for (let i = 0; i < data.length; i++) {
            let sidObj = {
                sid: data[i].sid,
                name: data[i].name
            };
            /*console.log("sidObj");
            console.log(sidObj);*/
            let result = await sidService.findBySidAndClassroomId(sidObj.sid, classroomId);
            if (!result) {
                sidObj.classroomID = classroomId;
                sidObj.userID = null;
                let newSid = await sidService.create(sidObj);
                if (!newSid) {
                    return res.status(500).json({msg: 'Cannot create new Sid'});
                }
                else {
                    console.log('newSid:');
                    console.log(newSid.SID);
                }
            }
            else { 
                // Duplicate SID log already existed, do not update the id bound with the duplicate SID
                //let updatedSidObj = await sidService.updateName(result);
                //if (updatedSidObj)
                //    console.log('Name updated');
                console.log('Sid has already existed');
            }
        }
        return res.status(200).json({msg: 'Import student list successfully'});
    },
    findAllByClassroomId: async (req, res) => {
        let classroomID = parseInt(req.params.classroomId);
        let result = await sidService.findAllByClassroomId(classroomID);
        
        if (result) {
            console.log(result)
            return res.status(200).json(result);
        }
        else return res.status(500).json({err: 'Cannot find with classroom id'});
    },
    findStudentAndScoreByClassroomID: async(req, res) => {
        //console.log("req.user", req.user);
        let id = parseInt(req.user.id);
        let userID = parseInt(req.user.userID);
        let account = await accountService.getAccountWithID(id);
        if (account) {
            let classroomId = parseInt(req.params.classroomId);
            //console.log("account", account);
            let result;
            // Yes this is dumb. Thanks
            if (account.role != 2) {
                // For teacher, admin
                console.log("No finalize check");
                result = await sidService.findStudentAndScoreByClassroomID(classroomId);
            }
            else {
                // For student
                console.log("Finalize check");
                result = await sidService.getStudentAndScoreByClassroomIDWithFinalize(userID, classroomId);
            }
            if (result) {
                console.log("findStudentAndScoreByClassroomID", result);
                return res.status(200).json(result);
            }
            else return res.status(500).json({err: 'Cannot find student and score with this classroom id'});
        }
    },
    updateSID: async (req, res) => {
        let sid = req.body.sid;
        let userID = parseInt(req.body.userId);
        let result = await sidService.updateSID(sid, userID);

        if (result) {
            return res.status(200).json(result);
        }
        else return res.status(500).json({err: 'Cannot update SID'});
    },
    updateOrCreateIfNotExist: async (req, res) => {
        let sid = req.body.sid;
        let userID = parseInt(req.body.userId);
        let foundSIDInstance = await sidService.findByPk(sid)
        let foundUserInstance = await userService.getUserWithID(userID)

        console.log("foundSIDInstance: ", foundSIDInstance)
        console.log("found USer: ", foundUserInstance)
        if(foundSIDInstance && foundUserInstance) {
            if(foundSIDInstance.userID != foundUserInstance.id) {
                return res.status(500).json({ err: "This SID is taken by another student." })
            }
            else {
                console.log("typeof instance.userID: ", typeof(foundSIDInstance.userID))
                return res.status(200).json(await sidService.updateSID(sid, userID))
            }
        }
        else if (foundUserInstance && !foundSIDInstance) {

            let created = await sidService.create({
                SID: sid,
                userID: userID,
                classroomID: 1,
                name: foundSIDInstance.name
            })

            return res.status(200).json(created)
        }
        else return res.status(500).json({ err: "UNK" })

    }
}

module.exports = sidController