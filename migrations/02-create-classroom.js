'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Classrooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      section: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      inviteLink: {
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
    await queryInterface.dropTable('Classrooms');
  }
};