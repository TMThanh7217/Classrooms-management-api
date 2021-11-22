'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Classroom.belongsToMany(models.User, {
        through: "UserClassroom",
        foreignKey: 'classroomID'
      });
      Classroom.hasMany(models.Assignment, {foreignKey: 'classroomID'}, {onDelete: 'CASCADE'});
    }
  };
  Classroom.init({
    name: DataTypes.STRING,
    section: DataTypes.STRING,
    description: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    inviteLink: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Classroom',
  });
  return Classroom;
};