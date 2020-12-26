const Sequelize = require("sequelize");

const sequelize = new Sequelize("locadora", "root", "ottcloud", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
