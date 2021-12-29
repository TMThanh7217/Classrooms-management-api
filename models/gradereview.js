'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gradereview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gradereview.belongsTo(models.User, {foreignKey: 'studentID'}, {onDelete: 'CASCADE'});
      Gradereview.belongsTo(models.Assignment, {foreignKey: 'assignmentID'}, {onDelete: 'CASCADE'});
      Gradereview.hasMany(models.Comment, {foreignKey: 'gradereviewID'}, {onDelete: 'CASCADE'});
    }
  };
  Gradereview.init({
    studentID: DataTypes.INTEGER,
    assignmentID: DataTypes.INTEGER,
    expectGrade: DataTypes.DECIMAL,
    explaination: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gradereview',
  });
  return Gradereview;
};