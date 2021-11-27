'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Classroom, {
        through: "UserClassroom",
        foreignKey: 'userID'
      }, {onDelete: 'CASCADE'});
      User.belongsToMany(models.Assignment, {
        through: "StudentAssignment",
        foreignKey: 'userID'
      }, {onDelete: 'CASCADE'});
      User.hasMany(models.Account, {foreignKey: 'userID'}, {onDelete: 'CASCADE'});
      User.belongsToMany(models.Classroom, {
        through: "SID",
        foreignKey: 'userID'
      }, {onDelete: 'CASCADE'});
    }
  };
  User.init({
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    email: DataTypes.STRING,
    sex: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};