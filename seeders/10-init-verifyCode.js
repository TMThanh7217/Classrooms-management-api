'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let verifyCodeData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/verifyCode.json')));
    for (let data of verifyCodeData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('VerifyCodes', verifyCodeData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VerifyCodes', null, {});
  }
};
