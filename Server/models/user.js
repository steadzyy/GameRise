'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserGenre)
      User.hasMany(models.Game)
      User.hasMany(models.MyGames)
     
    }
  }
  User.init({
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username cannot be null"
        },
        notEmpty: {
          msg: "username cannot be an empty string"
        }
      },
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail :{
          msg : ('Invalid email format')
        },
        notEmpty : {
          msg : 'email must not be empty'
        }
      }
    },
    password:{
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [5, Infinity],
          msg : 'password must be at least 5 characters'}
      }},
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role cannot be null"
        },
        notEmpty: {
          msg: "Role cannot be an empty string"
        }
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(user, option){
        const genSaltSync = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(user.password, genSaltSync);
        user.password = password;
        // user.isSubscribed = false;
      }
    },
  });
  return User;
};