'use strict';
const {
    Model,
    DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper meth od for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Products.hasMany(models.sales, { foreignKey: 'productId' });
        }
    }
    Products.init({
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        description: DataTypes.TEXT,
        stock: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'products',
    });
    return Products;
};