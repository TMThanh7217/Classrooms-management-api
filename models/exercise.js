'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercise.belongsTo(models.Classroom, {foreignKey: 'classroomID'}, {onDelete: 'CASCADE'});
      Exercise.belongsToMany(models.User, {
        through: "StudentExercise",
        foreignKey: 'exerciseID'
      });
    }
  };
  Exercise.init({
    classroomID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};