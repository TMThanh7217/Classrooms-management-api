'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerifyCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VerifyCode.belongsTo(models.User, {foreignKey: 'userID'}, {onDelete: 'CASCADE'});
    }
  };
  VerifyCode.init({
    userID: DataTypes.INTEGER,
    code: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VerifyCode',
  });
  return VerifyCode;
};