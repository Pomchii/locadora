const express = require("express");

const filmesController = require("../controllers/filmes");
const isAuth = require("../middleware/jwt");

const router = express.Router();

router.get("/", filmesController.getFilmes);

router.get("/disponivel", isAuth, filmesController.getFilmesDisponiveis);

router.get("/:tituloFilme", filmesController.findFilmeByName);

module.exports = router;
