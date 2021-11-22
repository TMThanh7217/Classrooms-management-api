'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assignment.belongsTo(models.Classroom, {foreignKey: 'classroomID'}, {onDelete: 'CASCADE'});
      Assignment.belongsToMany(models.User, {
        through: "StudentAssignment",
        foreignKey: 'assignmentID'
      });
    }
  };
  Assignment.init({
    classroomID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    maxPoint: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    position: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Assignment',
  });
  return Assignment;
};