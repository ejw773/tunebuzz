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
    artist: DataTypes.STRING,
    title: DataTypes.STRING,
    album: DataTypes.STRING,
    year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    songId: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Music',
  });
  return Music;
};