import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorGetItem = [
  check("id")
    .exists()
    .withMessage("Id é obrigatório")
    .notEmpty()
    .withMessage("Id não pode ser vazio")
    .isMongoId()
    .withMessage("Formato de Id inválido"),
];

export const validatorDeleteItem = [
  check("id")
    .exists()
    .withMessage("Id é obrigatório")
    .notEmpty()
    .withMessage("Id não pode ser vazio")
    .isMongoId()
    .withMessage("Formato de Id inválido"),
];