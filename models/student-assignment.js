'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StudentAssignment.init({
    SID: DataTypes.STRING,
    assignmentID: DataTypes.INTEGER,
    score: DataTypes.DECIMAL,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentAssignment',
  });
  return StudentAssignment;
};