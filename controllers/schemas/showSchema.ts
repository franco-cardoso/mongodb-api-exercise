import { check } from "express-validator";
import categories from "../../misc/categories";

// prettier-ignore
export default [
    check("title")
        .notEmpty()
        .withMessage("El título no puede estar vacio")
        .optional({nullable:true})
        
        ,

    check("description")
        .notEmpty()
        .withMessage("La descripción no puede estar vacía")
        .optional({nullable:true})

        ,

    check("coverImg")
        .notEmpty()
        .withMessage("Debes elegir una imagen")
        .isURL()
        .withMessage("La imagen debe ser una URL")
        .optional({nullable:true})

        ,

    check("type")
        .notEmpty()
        .withMessage("Debes elegir el tipo de show")
        .isIn(['Anime','OVA','Película','Especial'])
        .withMessage("Este tipo es inválido")
        .optional({nullable:true})

        ,

    check("category")
        .notEmpty()
        .withMessage("Debes elegir la categoría")
        .isIn(categories)
        .withMessage("Esta categoría es inválida")   
        .optional({nullable:true})
    ]
