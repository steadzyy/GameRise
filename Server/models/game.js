'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.belongsTo(models.Genre)
      Game.belongsTo(models.User)
      Game.hasMany(models.MyGames)
    }
  }
  Game.init({
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title cannot be null"
        },
        notEmpty: {
          msg: "Title cannot be an empty string"
        }
      },
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description cannot be null"
        },
        notEmpty: {
          msg: "Description cannot be an empty string"
        }
      },
    },
    price:{
      defaultValue: 0,
      type: DataTypes.INTEGER,
    },
    imageUrl:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "ImageUrl cannot be null"
        },
        notEmpty: {
          msg: "ImageUrl cannot be an empty string"
        }
      },
    },
    GenreId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};