const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Cart = sequelize.define('Cart', {
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    grandtotal: {
        type: DataTypes.REAL,
        allowNull: true,
        validate: {
            isFloat: true,
            min: 0
        }
    },
    itemtotal: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true,
            min: 0
        }
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "customer",
            key: "customer_id"
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "product",
            key: "product_id"
        }
    }
}, {
    tableName: 'cart',
    timestamps: false
});

module.exports = Cart;
