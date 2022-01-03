const { update } = require("../accounts/accountModel");
const sidService = require("../sid/sidService")
const userService = require("../users/userService");

const sidController = {
    addSID: async (req, res) => {
        let sidObj = {
            sid: req.body.sid,
            classroomID: parseInt(req.body.classroomId ?? req.params.classroomId),
            userID: parseInt(req.body.userId) ?? null,
            name: req.body.name
        }
        console.log("data", sidObj)
        let instance = await sidService.findBySidAndClassroomId(sidObj.sid, sidObj.classroomID)
        console.log("SID found: ", instance)

        if(instance) {
            console.log(instance)
            let oldSid = await sidService.findByUserId(sidObj.userID);
            console.log("User found", oldSid)
            if (!oldSid) {
                console.log("Fail old SID check");
                // The name may or may not required. Check this later
                const requireFields = ['name', 'sid', 'classroomId']
                const validateAddData = data => requireFields.every(field => Object.keys(data).includes(field))
                let isValid = Object.keys(validateAddData(sidObj))
                if(isValid) {
                    sidService
                    .updateNameAndUserID(sidObj)
                    .then(instance => res.status(200).json({data: instance, msg: "SID was successfully created."}))
                    .catch(err => res.status(500).json({msg: err}))
                }
                else return res.status(500).json({msg: "Invalid post data."});
            }
            else return res.status(500).json({msg: "This SID has been created in this class."});
        }
        else {
            const foundSID = await sidService.findByUserId(sidObj.userID)
            console.log("found SID", foundSID)
            if(!foundSID) {
                const requireFields = ['name', 'sid', 'classroomId']
                const validateAddData = data => requireFields.every(field => Object.keys(data).includes(field))
                let isValid = Object.keys(validateAddData(sidObj))
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
                console.log("Call update SID")
                sidService
                    .updateSID(sidObj.sid, sidObj.userID)
                    .then(instance => res.status(200).json({data: instance, msg: "SID was successfully updated."}))
                    .catch(err => res.status(500).json({msg: err}))
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