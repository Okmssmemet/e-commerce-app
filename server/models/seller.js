const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Seller = sequelize.define('Seller', {
    seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    seller_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [2, 255],
            notEmpty: true
        }
    },
    seller_phone: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
            isNumeric: true,
            len: [10, 15]
        }
    },
    total_sales: {
        type: DataTypes.REAL,
        allowNull: true,
        validate: {
            isFloat: true,
            min: 0
        }
    }
}, {
    tableName: 'seller',
    timestamps: false
});

module.exports = Seller;
