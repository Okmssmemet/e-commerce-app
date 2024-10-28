const config = require("../config/config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: "postgres",
    host: config.db.host,
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL server bağlantısı başarılı");
    } catch (error) {
        console.log("Bağlantı hatası:", error);
    }
}

connect();
module.exports = sequelize;
