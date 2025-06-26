import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorSignUpPerson =[
    check("name")
        .exists()
        .withMessage("Nome é obrigatório")
        .notEmpty()
        .withMessage("Nome não pode ser vazio")
        .isLength({ min: 3 , max: 50 })
        .withMessage("Nome deve ter entre 3 e 50 caracteres"),
    check("password")
        .exists()
        .withMessage("Senha é obrigatória")
        .notEmpty()
        .withMessage("Senha não pode ser vazia")
        .isLength({ min: 6, max: 20 })
        .withMessage("Senha deve ter entre 6 e 20 caracteres"), 
    check("email")
        .exists()
        .withMessage("Email é obrigatório")
        .notEmpty()
        .withMessage("Email não pode ser vazio")
        .isEmail()
        .withMessage("Formato de email inválido"),
    (req, res, next) => {
        validateResults(req, res, next);
    }
]


export const validatorSignInPerson = [
  check("password")
    .exists()
    .withMessage("Senha é obrigatória")
    .notEmpty()
    .withMessage("Senha não pode ser vazia")
    .isLength({ min: 6, max: 12 })
    .withMessage("Senha deve ter entre 6 e 12 caracteres"),
  check("email")
    .exists()
    .withMessage("Email é obrigatório")
    .notEmpty()
    .withMessage("Email não pode ser vazio")
    .isEmail()
    .withMessage("Formato de email inválido"),
  (req, res, next) => {
    validateResults(req, res, next);
  },
];
