const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Payment = sequelize.define('Payment', {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    paymentmode: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
            len: [3, 10]
        }
    },
    dateofpayment: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: true
        }
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "order_table",
            key: "order_id"
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
    tableName: 'payment',
    timestamps: false
});

module.exports = Payment;
