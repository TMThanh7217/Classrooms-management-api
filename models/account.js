'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, {foreignKey: 'userID'}, {onDelete: 'CASCADE'})
    }
  };
  Account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    createdDate: DataTypes.DATE,
    googleToken: DataTypes.STRING,
    role: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};