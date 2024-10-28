const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    
    
}, {
    tableName: 'category', // Veritabanınızdaki tablo adı
    timestamps: false, // Eğer 'createdAt' ve 'updatedAt' alanları yoksa
});

module.exports = Category;
