const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Seller = sequelize.define('Seller', {
    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true // ID otomatik olarak artacak
    },
    seller_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    seller_phone: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    total_sales: {
        type: DataTypes.REAL,
        allowNull: true
    }
}, {
    tableName: 'seller',
    timestamps: false // createdAt ve updatedAt sütunlarını eklemiyoruz
});

module.exports = Seller;
