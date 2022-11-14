import { check } from "express-validator";

// prettier-ignore
export default [
    check("title")
        .exists()    
        .notEmpty()
        .withMessage("Debes ingresar un título")
    
        ,

    check("description")
        .exists()    
        .notEmpty()
        .withMessage("Debes ingresar una descripción")

        ,

    check("url")
        .exists()
        .notEmpty()
        .withMessage("Debes ingresar un video para el episodio")
        .isURL()
        .withMessage("El video debe ser una URL válida")
]
