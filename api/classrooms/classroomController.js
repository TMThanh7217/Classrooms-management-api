const classroomService = require('./classroomService');

exports.list = function(req, res) {
    const classrooms = classroomService.list();

    if (classrooms) {
        //res.status(200).json(classrooms);
        res.status(200).send(classrooms);
      }
      else {
        res.status(404).json({msg: 'Cannot find classroom with the given id'});
      }
};

exports.detail = function(req, res) {
    const classroomId = req.params.id;
    const classroomDetail = classroomService.detail(parseInt(classroomId));
    
    if (classroomDetail) {
        res.status(200).json(classroomDetail);
      }
      else {
        res.status(404).json({msg: 'Cannot find classroom with the given id'});
      }
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