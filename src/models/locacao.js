const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Locacao = sequelize.define(
  "locacao",
  {
    loc_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  { timestamps: false }
);

module.exports = Locacao;
