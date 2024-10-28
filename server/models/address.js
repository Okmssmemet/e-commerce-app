const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const adress = sequelize.define("Adress",{
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Birincil anahtar
        autoIncrement: true
    },
    apart_no:{
        type:DataTypes.STRING(10),
        allowNull : true
    },
    apart_name:{
        type:DataTypes.STRING(255),
        allowNull : true
    },
    streetname:{
        type:DataTypes.STRING(255),
        allowNull : true
    },
    state:{
        type:DataTypes.STRING(255),
        allowNull : true
    },
    city:{
        type:DataTypes.STRING(255),
        allowNull : true
    },
    pincode:{
        type:DataTypes.INTEGER,
        allowNull : true
    },
    customer_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"customer",
            key:"customer_id"
        }
    }

}, {
    tableName: 'address', // Veritabanınızdaki tablo adı
    timestamps: false, // Eğer 'createdAt' ve 'updatedAt' alanları yoksa
});

module.exports = adress;