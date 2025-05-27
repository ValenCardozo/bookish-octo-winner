const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER
}, {
    tableName: 'products',
    timestamps: false
});

module.exports = Product;