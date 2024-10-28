const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Order_Table = sequelize.define('Order_Table', {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    order_date: {
        type: DataTypes.DATEONLY, // DATE olarak güncellendi
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    order_amount: {
        type: DataTypes.REAL,
        allowNull: true,
    },
    order_status: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    shipping_date: {
        type: DataTypes.DATEONLY, // DATE olarak güncellendi
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "customer",
            key: "customer_id"
        }
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "cart",
            key: "cart_id"
        }
    },
}, {
    tableName: 'order_table',
    timestamps: false, // Timestamps kaldırıldı
});

module.exports = Order_Table;
