const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Review = sequelize.define('Review', {
    review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true // Varsayılan olarak otomatik artış
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "customer", // customer tablosuna bağlama
            key: "customer_id"
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "product", // product tablosuna bağlama
            key: "product_id"
        }
    },
}, {
    tableName: 'review',
    timestamps: false // createdAt ve updatedAt alanlarını eklemiyoruz
});

module.exports = Review;
