'use strict';
const {
    Model,
    DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Users.hasMany(models.sales, {foreignKey: 'userId'});
        }
    }
    Users.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        age: DataTypes.INTEGER,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'users',
        tableName: 'users',
    });
    return Users;
};