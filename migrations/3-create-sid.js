'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SIDs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SID: {
        type: Sequelize.STRING,
      },
      classroomID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Classrooms',
          key: 'id',
        }
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      }, name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SIDs');
  }
};