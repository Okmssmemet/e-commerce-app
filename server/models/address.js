const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const adress = sequelize.define("Adress", {
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    apart_no: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            len: [1, 10],
            notEmpty: true,
            isAlphanumeric: true
        }
    },
    apart_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    streetname: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    city: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255]
        }
    },
    pincode: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "customer",
            key: "customer_id"
        }
    }
}, {
    tableName: 'address',
    timestamps: false
});

module.exports = adress;
