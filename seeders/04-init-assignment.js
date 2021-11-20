'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let assignmentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/assignment.json')));
    for (let data of assignmentData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Assignments', assignmentData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Assignments', null, {});
  }
};
