'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let gradereviewData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/gradereview.json')));
    for (let data of gradereviewData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Gradereviews', gradereviewData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Gradereviews', null, {});
  }
};
