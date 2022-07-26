'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Housing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Housing.init(
    {
      Name: DataTypes.STRING,
      Description: DataTypes.TEXT,
      PhoneNumber: DataTypes.STRING,
      Address: DataTypes.TEXT,
      Email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Housing',
    }
  );
  return Housing;
};
