import { check } from "express-validator";
import { validateResults } from "../utils/handleValidator.js";

export const validatorCreateItem =[
    check("name")
        .exists()
        .withMessage("Nome do track é obrigatório")
        .notEmpty()
        .withMessage("Nome da track não pode ser vazio"),
    check("album")
        .exists()
        .withMessage("Album é obrigatório")
        .notEmpty()
        .withMessage("Album não pode ser vazio"),
    check("artist")
        .exists()
        .withMessage("Artista é obrigatório")
        .notEmpty()
        .withMessage("Artista não deve ser vazop"),
    check("artist.name")
        .exists()
        .withMessage("Nome do artista é obrigatório")
        .notEmpty()
        .withMessage("Nome do artista não pode ser vazio"),
    check("artist.nickname")
        .exists()
        .withMessage("Nickname do artista é obrigatório")
        .notEmpty()
        .withMessage("Nickname do artista não pode ser vazio"),
    check("artist.nationality")
        .exists()
        .withMessage("Nacionalidade do artista é obrigatório")
        .notEmpty()
        .withMessage("Nacionalidade do artista não pode ser vazio"),
    check("duration.start")
        .exists()
        .withMessage("Tempo de início é obrigatório")
        .notEmpty()
        .withMessage("Tempo de início não pode ser vazio"),
    check("duration.end")
        .exists()
        .withMessage("Tempo de fim é obrigatório")
        .notEmpty()
        .withMessage("Tempo de fim não pode ser vazio"),
    check("cover")
        .exists()
        .withMessage("Capa é obrigatória")
        .notEmpty()
        .withMessage("Capa não pode ser vazia"),
    check("mediaId")
        .exists()
        .withMessage("Id da mídia é obrigatório")
        .notEmpty()
        .withMessage("Id da mídia não pode ser vazio"),
    (req, res, next) => {
        validateResults(req, res, next);
    }
]

export const validatorGetItem = [
    check("id")
        .exists()
        .withMessage("Id é obrigatório")
        .notEmpty()
        .withMessage("Id não pode ser vazio")
        .isMongoId()
        .withMessage("Formato de Id inválido"),
]


export const validatorDeleteItem = [
    check("id")
        .exists()
        .withMessage("Id é obrigatório")
        .notEmpty()
        .withMessage("Id não pode ser vazio")
        .isMongoId()
        .withMessage("Formato de Id inválido"),
]