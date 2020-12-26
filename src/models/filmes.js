const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Filmes = sequelize.define(
  "filmes",
  {
    f_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    f_titulo: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    f_diretor: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    f_quantidade: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Filmes;
