const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Review = sequelize.define('Review', {
    review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [5, 255],
            notEmpty: true
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true,
            min: 1,
            max: 5
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
    tableName: 'review',
    timestamps: false
});

module.exports = Review;
