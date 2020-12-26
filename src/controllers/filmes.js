const Filmes = require("../models/filmes");
const { Op } = require("sequelize");

exports.getFilmes = (req, res, next) => {
  Filmes.findAll()
    .then((filmes) => {
      res.status(200).json(filmes);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getFilmesDisponiveis = (req, res, next) => {
  Filmes.findAll({
    where: {
      f_quantidade: {
        [Op.gte]: 1,
      },
    },
  })
    .then((filmesDisponiveis) => {
      res.status(200).json(filmesDisponiveis);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.findFilmeByName = (req, res, next) => {
  const tituloFilme = req.params.tituloFilme;
  Filmes.findAll({
    where: {
      f_titulo: tituloFilme,
    },
  })
    .then((filmesBuscados) => {
      res.status(200).json(filmesBuscados);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
