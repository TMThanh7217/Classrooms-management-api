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
      });
      User.belongsToMany(models.Exercise, {
        through: "StudentExercise",
        foreignKey: 'userID'
      });
      User.hasMany(models.Account, {foreignKey: 'userID'});
    }
  };
  User.init({
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    email: DataTypes.STRING,
    sex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};