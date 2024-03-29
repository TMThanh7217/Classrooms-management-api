const classroomService = require('./classroomService');
const userService = require('../users/userService');
const user_classroomService = require('../user_classrooms/user_classroomService');
const accountService = require('../accounts/accountService');
const helper = require('../helper');

// why does this function not require async? idk. How can it even work but the others don't? why? :?
exports.create = function(req, res) {
  const classroom = {
      name: req.body.name,
      section: req.body.section,
      description: req.body.userID,
      createdBy: req.body.createdBy,
      inviteLink: ''
      //inviteLink: req.body.inviteLink
  };

  classroom.inviteLink = helper.makeInviteLink(8);
  let userID = parseInt(req.body.userID);
  // create return id only lmao
  classroomService.create(classroom)
    .then( newClassroomID => {
      if (newClassroomID) {
        let user_classroom = {
          userID: userID,
          classroomID: newClassroomID,
          // they create the classroom so they have teacher role in that classroom, fair enough right?
          role: 1, // change this later, reserve 0 for admin or something later, 1 = teacher, 2 = student 
          userCode: ''
        }
        user_classroomService.create(user_classroom, user_classroom.role)
          .then(result => {
            if (result) {
              //console.log(result);
              return res.status(200).json({msg: 'Classroom created', id: newClassroomID});
            }
            return res.status(200).json({msg: 'Classroom created, cannot add user to this classroom', id: newClassroomID});
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
          /*console.log("hello checking jwt here");
          console.log(req.user);*/
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

exports.getClassroomDetailWithClassroomID = async function(req, res) {
  let id = parseInt(req.params.id); // maybe change this later
  let classroomDetail = await classroomService.getClassroomDetailWithID(id)
  if (classroomDetail) {
    // userList is an array why idk
    let userList = await classroomService.getUserListWithClassroomID(id);
    if (userList) {
      //console.log("Hello");
      // okay what the hell is this?
      //console.log(userList[0].Users.UserClassroom.role);
      //console.log("userList", userList);
      //console.log("userList hi hi: ", userList);
      let creator = await userService.info(userList[0].createdBy);
      let teacherNumber = 0;
      let studentNumber = 0;
      for (let i = 0; i < userList.length; i++) {
        //console.log("user hi hi: ", userList[i]);
        // holy shiet this is retarded
        let role = await accountService.getRoleWithUserID(userList[i].Users.id);
        if (role) {
          console.log(role);
          // Oh my god this is even more retarded. Why i did this to myself
          userList[i].Users.role = role.role; // getRoleWithUserID return an object called role. So yes this does look retarded
          //console.log("user hi hi take 2: ", userList[i]);
          if (role.role == 1)
            teacherNumber += 1;
          if (role.role == 2)
            studentNumber += 1;
        }
      }
      //console.log("Creator", creator);
      classroomDetail.classMemberAmount = userList.length;
      classroomDetail.teacherNumber = teacherNumber;
      classroomDetail.studentNumber = studentNumber;
      return res.status(200).json({classroomDetail, creator, userList});
    }
    else {
      //console.log("No classroom");
      return res.status(404).json({msg: 'Cannot find any user in this classroom'});
    }
  }
  else {
    //console.log("No classroom");
    return res.status(404).json({msg: 'Cannot find classroom with the given id'});
  }
  /*classroomService.getClassroomDetailWithID(id)
    .then( classroomDetail => {
      if (classroomDetail) {
        classroomService.getUserListWithClassroomID(id)
          .then(userList => {
            //console.log("\nClassroom controller call service here");
            // classroom is an array lmao
              if (userList) {
                //console.log(classroom);
                console.log("Hello");
                // okay what the hell is this?
                //console.log(userList[0].Users.UserClassroom.role);
                //console.log("userList", userList);
                userService.info(userList[0].createdBy)
                  .then( (creator) => {
                    for (user in userList) {
                      let role = await accountService.getRoleWithUserID(user.id);
                      user.role = role;
                    }
                    //console.log("Creator", creator);
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
    });*/
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

exports.getClassroomDetailWithInviteLink = async function(req, res) {
  let inviteLink = req.params.inviteLink;
  //console.log(inviteLink);
  let classroom = await classroomService.getClassroomWithInviteLink(inviteLink);
  if (classroom) {
    // copy paste from getClassroomDetailWithClassroomID, used to be called getUserListWithClassroomID
    // did some sligth modification
    let id = classroom.id;
    console.log(id);
    let classroomDetail = await classroomService.getClassroomDetailWithID(id)
    if (classroomDetail) {
      // userList is an array why idk
      let userList = await classroomService.getUserListWithClassroomID(id);
      if (userList) {
        let creator = await userService.info(userList[0].createdBy);
        let teacherNumber = 0;
        let studentNumber = 0;
        for (let i = 0; i < userList.length; i++) {
          let role = await accountService.getRoleWithUserID(userList[i].Users.id);
          userList[i].Users.role = role.role;
          if (role.role == 1)
            teacherNumber += 1;
          if (role.role == 2)
            studentNumber += 1;
        }
        classroomDetail.classMemberAmount = userList.length;
        classroomDetail.teacherNumber = teacherNumber;
        classroomDetail.studentNumber = studentNumber;
        return res.status(200).json({classroomDetail, creator, userList});
      }
      else {
        return res.status(404).json({msg: 'Cannot find any user in this classroom'});
      }
    }
    else {
      return res.status(404).json({msg: 'Cannot find classroom with the given id'});
    }
  }
  else {
    return res.status(404).json({msg: 'Cannot find classroom with the invite link'});
  }
}
