'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Gradereviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SID: {
        type: Sequelize.STRING,
        references: {
          model: 'SIDs',
          key: 'SID',
        },
        onDelete: 'CASCADE'
      },
      assignmentID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Assignments',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      expectGrade: {
        type: Sequelize.DECIMAL
      },
      explaination: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Gradereviews');
  }
};