const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true // ID otomatik olarak artacak
    },
    product_name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    mrp: {
        type: DataTypes.REAL,
        allowNull: true
    },
    stock: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    brand: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "category", // category tablosuna bağlama
            key: "category_id"
        }
    },
    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "seller", // seller tablosuna bağlama
            key: "seller_id"
        }
    }
}, {
    tableName: 'product',
    timestamps: false // createdAt ve updatedAt sütunlarını eklemiyoruz
});

module.exports = Product;
