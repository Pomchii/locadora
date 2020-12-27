const Locacao = require("../models/locacao");
const Filmes = require("../models/filmes");
const { QueryTypes } = require("sequelize");
const sequelize = require("../util/database");

exports.aluga = (req, res, next) => {
  const filmeId = req.body.idFilme;
  const idUsuario = req.userId;

  Filmes.findByPk(filmeId)
    .then((filme) => {
      if (!filme) {
        const error = new Error("O filme nao pode ser econtrado");
        error.statusCode = 404;
        throw error;
      }

      if (filme.f_quantidade == 0) {
        const error = new Error("Filme esgotado");
        error.statusCode = 204;
        throw error;
      }

      return filme.update({ f_quantidade: filme.f_quantidade - 1 });
    })
    .then(() => {
      return Locacao.create({
        usuarioUsrId: idUsuario,
        filmeFId: filmeId,
      });
    })
    .then(() => {
      res.status(200).json({ message: "Filme Locado com sucesso" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.alugados = (req, res, next) => {
  const idUsuario = req.userId;

  sequelize
    .query(
      `SELECT locacaos.loc_id, locacaos.filmeFId, filmes.f_titulo, COUNT(locacaos.filmeFId) 
    as "qtd_filmes" FROM locadora.locacaos LEFT JOIN locadora.filmes 
    ON locacaos.filmeFId = filmes.f_id  where locacaos.usuarioUsrId = ${idUsuario} 
    group by filmeFId`,
      { type: QueryTypes.SELECT }
    )
    .then((alugados) => {
      res.status(200).json({
        idUsuario: idUsuario,
        locacao: alugados,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.devolucao = (req, res, next) => {
  const filmeId = req.body.idFilme;
  const idUsuario = req.userId;

  Locacao.findOne({
    where: { filmeFId: filmeId, usuarioUsrId: idUsuario },
  })
    .then((filmeLocado) => {
      return filmeLocado.destroy();
    })
    .then(() => {
      return Filmes.findByPk(filmeId);
    })
    .then((filme) => {
      return filme.update({ f_quantidade: filme.f_quantidade + 1 });
    })
    .then(() => {
      res.status(200).json({ message: "Filme devolvido com sucesso" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
