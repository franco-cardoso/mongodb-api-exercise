import { check } from "express-validator";
import categories from "../../misc/categories";

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

    check("coverImg")
        .exists()    
        .notEmpty()
        .withMessage("Debes elegir una imagen")
        .isURL()
        .withMessage("La imagen debe ser una URL")

        ,

    check("type")
        .exists()    
        .notEmpty()
        .withMessage("Debes elegir el tipo de show")
        .isIn(['Anime','OVA','Película','Especial'])
        .withMessage("Este tipo es inválido")

        ,

    check("categories")
        .exists()    
        .notEmpty()
        .withMessage("Debes elegir las categorías")
    
        ,

    check("categories.*")
        .isIn(categories)
        .withMessage("Categorías invalidas")
    ]