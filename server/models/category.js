const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [3, 255],
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [3, 255]
        }
    }
}, {
    tableName: 'category',
    timestamps: false
});

module.exports = Category;
