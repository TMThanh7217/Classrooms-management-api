'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {foreignKey: 'authorID'}, {onDelete: 'CASCADE'});
      Comment.belongsTo(models.Gradereview, {foreignKey: 'gradereviewID'}, {onDelete: 'CASCADE'});
    }
  };
  Comment.init({
    authorID: DataTypes.INTEGER,
    gradeReviewID: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};