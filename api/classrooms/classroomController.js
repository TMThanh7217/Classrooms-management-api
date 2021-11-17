const classroomService = require('./classroomService');
const userService = require('../users/userService');
const user_classroomService = require('../user_classrooms/user_classroomService');

// why does this function not require async? idk. How can it even work but the others don't? why? :?
exports.create = function(req, res) {
  const classroom = {
      name: req.body.name,
      section: req.body.section,
      description: req.body.userID,
      createdBy: req.body.createdBy,
  };
  let userID = req.body.userID;
  classroomService.create(classroom)
    .then( classroomId => {
      if (classroomId) {
        user_classroomService.create(userID, classroomId)
          .then(result => {
            console.log(result);
            return res.status(201).json({msg: 'Classroom created', id: classroomId});
          })
      }
      else {
        return res.status(500).json({msg: 'Cannot create classroom with the given id'});
      }
    })
};

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
            return res.status(404).json({msg: 'Cannot find any classroom'});
          }
      });
};

exports.listAllClassroomWithUserID = async function(req, res) {
  // The id is returned when user login, store it in local storage or cookies or whatever and use it here
  let userID = req.query.userID; // maybe change this later
  if (userID) {
    classroomService.listAllClassroomWithUserID(userID)
      .then( classrooms => {
        //console.log("\nClassroom controller call service here");
        if (classrooms) {
          /*let name = [];
          for (let classroom in classrooms) {
            let creator = userService.info(classroom.createdBy);
            name.push(creator);
          }
          return res.status(200).json({classrooms, name});*/
          return res.status(200).json({classrooms});
        }
        else {
          //console.log("No classroom");
          return res.status(404).json({msg: 'Cannot find classroom with the given id'});
        }
      });
  }
  else  {
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
          return res.status(404).json({msg: 'Cannot find any classroom'});
        }
    });
  }
};

exports.getUserListWithClassroomID = async function(req, res) {
  let id = req.params.id; // maybe change this later
  classroomService.getClassroomDetailWithID(parseInt(id))
    .then( classroomDetail => {
      if (classroomDetail) {
        classroomService.getUserListWithClassroomID(parseInt(id))
          .then(userList => {
            //console.log("\nClassroom controller call service here");
            // classroom is an array lmao
              if (userList) {
                //console.log(classroom);
                console.log("Hello ");
                console.log(userList[0].Users.UserClassroom.role);
                userService.info(userList[0].createdBy)
                  .then( (creator) => {
                    return res.status(200).json({classroomDetail, creator, userList});
                  })
                  .catch(err => console.log(err));
              }
        });
      }
      else {
        //console.log("No classroom");
        return res.status(404).json({msg: 'Cannot find classroom with the given id'});
      }
    });
}

exports.getClassroomDetailWithID = function(req, res) {
    let classroomId = req.params.id;
    classroomService.getClassroomDetailWithID(parseInt(classroomId))
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

exports.getClassroomDetailWithInviteLink = function(req, res) {
  let inviteLink = req.params.inviteLink;
  //console.log(inviteLink);
  classroomService.getClassroomDetailWithInviteLink(inviteLink)
    .then(classroomDetail => {
      if (classroomDetail) {
        return res.status(200).json(classroomDetail);
      }
      else {
        return res.status(404).json({msg: 'Cannot find classroom with the invite link'});
      }
    })
}
