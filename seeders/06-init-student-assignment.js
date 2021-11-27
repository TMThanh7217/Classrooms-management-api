'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let studentAssignmentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/student_assignment.json')));
    for (let data of studentAssignmentData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('StudentAssignments', studentAssignmentData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentAssignments', null, {});
  }
};
