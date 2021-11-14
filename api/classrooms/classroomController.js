const classroomService = require('./classroomService');

exports.listAllClassroom = async function(req, res) {
    /*const classrooms = classroomService.list();
    console.log("Classroom controller call service here");
    if (classrooms) {
        console.log("Has classrooms");
        //res.status(200).json(classrooms);
        //res.status(200).send(classrooms);
        console.log(classrooms)
        return res.status(200).json(classrooms);
      }
      else {
        console.log("Yikes");
        return res.status(404).json({msg: 'Cannot find classroom with the given id'});
      }*/
    classroomService.listAllClassroom()
      .then( classrooms => {
        //console.log("\nClassroom controller call service here");
          if (classrooms) {
            /*console.log("Has classrooms");
            console.log(classrooms)*/
            //res.status(200).json(classrooms);
            //res.status(200).send(classrooms);
            return res.status(200).json(classrooms);
          }
          else {
            //console.log("No classroom");
            return res.status(404).json({msg: 'Cannot find classroom with the given id'});
          }
      });
};

exports.detail = function(req, res) {
    const classroomId = req.params.id;
    classroomService.detail(parseInt(classroomId))
    .then( (classroomDetail) => {
      /*console.log(classroomId);
      console.log(classroomDetail);*/
      if (classroomDetail) {
          return res.status(200).json(classroomDetail);
        }
      else {
        return res.status(404).json({msg: 'Cannot find classroom with the given id'});
      }
    });
};

exports.create = function(req, res) {
    const classroom = {
        name: req.body.classroomName,
    };
    const classroomId = classroomService.create(classroom);
    if (classroomId) {
        res.status(201).json({msg: 'Classroom created', id: classroomId});
      }
      else {
        res.status(500).json({msg: 'Cannot find classroom with the given id'});
      }
};