'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Music.init({
    Genre1: DataTypes.STRING,
    genre2: DataTypes.STRING,
    genre3: DataTypes.STRING,
    songID: DataTypes.CHAR,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Music',
  });
  return Music;
};