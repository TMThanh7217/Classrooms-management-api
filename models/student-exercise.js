'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StudentExercise.init({
    userID: DataTypes.INTEGER,
    exerciseID: DataTypes.INTEGER,
    score: DataTypes.DECIMAL,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentExercise',
  });
  return StudentExercise;
};