const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Customer = sequelize.define('Customer', {
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Birincil anahtar
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING(50), // character varying(50)
        allowNull: true, // Not null değilse 'true' olarak bırakabilirsiniz
    },
    middlename: {
        type: DataTypes.STRING(50), // character varying(50)
        allowNull: true,
    },
    lastname: {
        type: DataTypes.STRING(50), // character varying(50)
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(100), // character varying(100)
        allowNull: true,
        unique: true, // E-posta benzersiz olmalı
    },
    dateofbirth: {
        type: DataTypes.DATEONLY, // date
        allowNull: true,
    },
    phone: {
        type: DataTypes.BIGINT, // bigint
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER, // int
        allowNull: true,
    },
}, {
    tableName: 'customer', // Veritabanınızdaki tablo adı
    timestamps: false, // Eğer 'createdAt' ve 'updatedAt' alanları yoksa
});

module.exports = Customer;
