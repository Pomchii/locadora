const express = require("express");

const locacaoController = require("../controllers/locacao");
const isAuth = require("../middleware/jwt");

const router = express.Router();

router.post("/aloca", isAuth, locacaoController.aluga);

router.get("/alocados", isAuth, locacaoController.alugados);

module.exports = router;
