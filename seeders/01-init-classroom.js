'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let classroomData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/classroom.json')));
    for (let data of classroomData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Classrooms', classroomData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Classrooms', null, {});
  }
};
