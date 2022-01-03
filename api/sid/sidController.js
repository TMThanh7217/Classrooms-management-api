const { update } = require("../accounts/accountModel");
const sidService = require("../sid/sidService")
const userService = require("../users/userService");
const studentAssignmentService = require("../student_assignments/student_assignmentService");
const studentAssignment = require("../../models/student-assignment");

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
                    sidService
                        .create(sidObj)
                        .then(instance => res.status(200).json({data: instance, msg: "SID was successfully created."}))
                        .catch(err => res.status(500).json({msg: err}))
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
                let deleteResult = await sidService.deleteBySID(foundSID.SID);
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
        let classroomId = parseInt(req.params.classroomId);
        let result = await sidService.findStudentAndScoreByClassroomID(classroomId)

        if (result) {
            //console.log(result);
            //console.log("findStudentAndScoreByClassroomID", result);
            return res.status(200).json(result);
        }
        else return res.status(500).json({err: 'Cannot find student and score with this classroom id'});
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