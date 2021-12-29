'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StudentAssignments', {
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
        }
      },
      assignmentID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Assignments',
          key: 'id',
        }
      },
      score: {
        type: Sequelize.DECIMAL(10, 1)
      },
      status: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('StudentAssignments');
  }
};