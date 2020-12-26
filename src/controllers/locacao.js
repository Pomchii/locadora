const Locacao = require("../models/locacao");
const Usuarios = require("../models/usuarios");
const Filmes = require("../models/filmes");

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
    .then((filmeAtt) => {
      res.status(200).json({ message: "Filme Locado com sucesso" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

  Locacao.create({
    usuarioUsrId: idUsuario,
    filmeFId: filmeId,
  });
};

exports.alugados = (req, res, next) => {
  const idUsuario = req.userId;

  Locacao.findAll({ where: { usuarioUsrId: idUsuario } })
    .then((locacaoUsuarios) => {
      console.log(locacaoUsuarios.filmeFId);
      // Filmes.findAll({ where: { f_id:  } });
      res.status(200).json(locacaoUsuarios);
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
};
