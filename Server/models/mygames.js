'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyGames extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyGames.belongsTo(models.Game)
      MyGames.belongsTo(models.User)
    }
  }
  MyGames.init({
    status:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Status cannot be null"
        },
        notEmpty: {
          msg: "Status cannot be an empty string"
        }
      },
    },
    GameId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyGames',
  });
  return MyGames;
};