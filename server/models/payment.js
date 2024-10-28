const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Payment = sequelize.define('Payment', {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Otomatik artan birincil anahtar
    },
    paymentmode: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    dateofpayment: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "order_table", // Dış anahtarın referansı
            key: "order_id"
        }
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "customer", // Dış anahtarın referansı
            key: "customer_id"
        }
    },
}, {
    tableName: 'payment',
    timestamps: false, // 'createdAt' ve 'updatedAt' alanları eklenmeyecek
});

module.exports = Payment;
