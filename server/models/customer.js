const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Customer = sequelize.define('Customer', {
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [1, 50],
            notEmpty: true
        }
    },
    middlename: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [1, 50]
        }
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [1, 50],
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    dateofbirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
            isNumeric: true,
            len: [10, 15]
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true,
            min: 0
        }
    }
}, {
    tableName: 'customer',
    timestamps: false
});

module.exports = Customer;
