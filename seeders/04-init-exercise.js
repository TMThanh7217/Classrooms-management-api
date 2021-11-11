'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let exerciseData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/exercise.json')));
    for (let data of exerciseData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Exercises', exerciseData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Exercises', null, {});
  }
};
