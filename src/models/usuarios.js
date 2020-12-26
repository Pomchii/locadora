const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Usuarios = sequelize.define(
  "usuarios",
  {
    usr_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    usr_nome: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    usr_email: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true,
    },
    usr_senha: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Usuarios;
