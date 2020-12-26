const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const cors = require("./middleware/cors");

const app = express();

const filmesRoute = require("./routes/filmes");
const authRoute = require("./routes/auth");
const locacaoRoute = require("./routes/locacao");

app.use(bodyParser.json());
app.use(cors);

app.use(authRoute);
app.use("/filmes", filmesRoute);
app.use("/locacao", locacaoRoute);

const Filmes = require("./models/filmes");
const Locacao = require("./models/locacao");
const Usuarios = require("./models/usuarios");

Usuarios.hasMany(Locacao, { onDelete: "CASCADE" });
Filmes.hasMany(Locacao, { onDelete: "CASCADE" });

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {});
