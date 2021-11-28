'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let SIDData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/SID.json')));
    for (let data of SIDData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('SIDs', SIDData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SIDs', null, {});
  }
};
