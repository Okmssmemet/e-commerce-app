const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const OrderItem = sequelize.define('OrderItem', {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "Order_Table",
            key: "order_id"
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: "product",
            key: "product_id"
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true,
            min: 1
        }
    }
}, {
    tableName: 'orderitem',
    timestamps: false
});

module.exports = OrderItem;
