const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const OrderItem = sequelize.define('OrderItem', {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true // order_id birincil anahtar
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true // order_id birincil anahtar
    },
    mrp: {
        type: DataTypes.REAL,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'orderitem', // Veritabanındaki tablo adı
    timestamps: false, // 'createdAt' ve 'updatedAt' alanları yok
    primaryKey: ['order_id', 'product_id'] // Birleşik birincil anahtar
});

module.exports = OrderItem;
