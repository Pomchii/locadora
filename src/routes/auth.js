const express = require("express");
const { body } = require("express-validator/check");

const Usuario = require("../models/usuarios");
const authController = require("../controllers/auth");
const Usuarios = require("../models/usuarios");

const router = express.Router();

router.post(
  "/signUp",
  [
    body("email")
      .isEmail()
      .withMessage("E-mail invalido!")
      .custom((value, { req }) => {
        return Usuarios.findOne({ where: { usr_email: value } }).then(
          (userDoc) => {
            if (userDoc) {
              return Promise.reject("Email ja existente!");
            }
          }
        );
      }),
    body("senha").trim().isLength({ min: 5 }),
    body("nome").trim().not().isEmpty(),
  ],
  authController.postSignUp
);

router.post("/login", authController.postLogin);

module.exports = router;
