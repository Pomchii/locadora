const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuarios = require("../models/usuarios");

exports.postSignUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const nome = req.body.nome;
  const senha = req.body.senha;

  bcrypt
    .hash(senha, 12)
    .then((criptoSenha) => {
      return Usuarios.create({
        usr_email: email,
        usr_nome: nome,
        usr_senha: criptoSenha,
      });
    })
    .then(() => {
      res.status(201).json({ message: "Usuario Cadastrado com sucesso!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const senha = req.body.senha;
  let loadedUser;
  Usuarios.findOne({ where: { usr_email: email } })
    .then((usuario) => {
      if (!usuario) {
        const error = new Error("O usuario nao pode ser econtrado");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = usuario;

      return bcrypt.compare(senha, usuario.usr_senha);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Senha incorreta");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.usr_email,
          userId: loadedUser.usr_id.toString(),
        },
        "ChaveSegredoJsonWebToken",
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .json({ token: token, userId: loadedUser.usr_id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
