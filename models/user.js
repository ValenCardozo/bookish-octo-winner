const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;