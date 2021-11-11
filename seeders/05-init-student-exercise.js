'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let studentExerciseData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/json/student_exercise.json')));
    for (let data of studentExerciseData) {
      data.createdAt = Sequelize.literal('NOW()');
      data.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('StudentExercises', studentExerciseData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentExercises', null, {});
  }
};
