const sidService = require("../sid/sidService")


const sidController = {
    addSID: async (req, res) => {
        let sidObj = {
            SID: req.body.sid,
            classroomID: req.body.classroomId ?? req.params.classroomId,
            userID: req.body.userId ?? null,
            name: req.body.name
        }
        let instance = await sidService.findBySidAndClassroomId(sidObj.SID, sidObj.classroomID)
        console.log(instance)

        if(instance) {
            console.log(instance)
            return res.status(500).json({msg: "This SID has been created in this class."})
        }
        else {
            const requireFields = ['name', 'sid', 'classroomId']
            const validateAddData = data => requireFields.every(field => Object.keys(data).includes(field))
            let isValid = Object.keys(validateAddData(sidObj))
            if(isValid)
                sidService
                .create(sidObj)
                .then(instance => res.status(200).json({data: instance, msg: "SID was successfully created."}))
                .catch(err => res.status(500).json({msg: err}))
            else return res.status(500).json({msg: "Invalid post data."})
        }
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
            console.log(result);
            return res.status(200).json(result);
        }
        else return res.status(500).json({err: 'Cannot find student and score with this classroom id'});
    },
}

module.exports = sidController