'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Food.init(
    {
      Name: DataTypes.STRING,
      Description: DataTypes.TEXT,
      PhoneNumber: DataTypes.STRING,
      Address: DataTypes.TEXT,
      Email: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Food',
    }
  );
  return Food;
};
