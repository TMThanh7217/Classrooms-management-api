'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserClassroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserClassroom.init({
    userID: DataTypes.INTEGER,
    classroomID: DataTypes.INTEGER,
    role: DataTypes.INTEGER,
    userCode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserClassroom',
  });
  return UserClassroom;
};