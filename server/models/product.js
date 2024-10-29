const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [3, 50],
            notEmpty: true
        }
    },
    mrp: {
        type: DataTypes.REAL,
        allowNull: true,
        validate: {
            isFloat: true,
            min: 0
        }
    },
    stock: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    brand: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [2, 255]
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "category",
            key: "category_id"
        }
    },
    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "seller",
            key: "seller_id"
        }
    }
}, {
    tableName: 'product',
    timestamps: false
});

module.exports = Product;
