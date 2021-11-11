'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let userClassroomData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/user_classroom.json')));
    for (let data of userClassroomData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('UserClassrooms', userClassroomData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserClassrooms', null, {});
  }
};
