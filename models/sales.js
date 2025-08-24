'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sales.belongsTo(models.users, {foreignKey: 'userId'});
      Sales.belongsTo(models.products, {foreignKey: 'productId'});
    }
  }
  Sales.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'sales',
  });
  return Sales;
};