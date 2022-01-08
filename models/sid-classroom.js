'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SIDClassroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SIDClassroom.init({
    studentSID: DataTypes.STRING,
    classroomID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SIDClassroom',
  });
  return SIDClassroom;
};