import { check } from "express-validator";
import categories from "../../misc/categories";

// prettier-ignore
export default [
    check("_id")
        .not()
        .exists()
        .withMessage("No puedes cambiar el campo '_id'")

        ,

    check("title")
        .notEmpty()
        .withMessage("El título no puede estar vacio")
        .optional({nullable:true,checkFalsy:true})
        
        ,

    check("description")
        .notEmpty()
        .withMessage("La descripción no puede estar vacía")
        .optional({nullable:true,checkFalsy:true})

        ,

    check("coverImg")
        .notEmpty()
        .withMessage("Debes elegir una imagen")
        .isURL()
        .withMessage("La imagen debe ser una URL")
        .optional({nullable:true,checkFalsy:true})

        ,

    check("type")
        .notEmpty()
        .withMessage("Debes elegir el tipo de show")
        .isIn(['Anime','OVA','Película','Especial'])
        .withMessage("Este tipo es inválido")
        .optional({nullable:true,checkFalsy:true})

        ,

    check("category")
        .notEmpty()
        .withMessage("Debes elegir la categoría")
        .isIn(categories)
        .withMessage("Esta categoría es inválida")   
        .optional({nullable:true,checkFalsy:true})
    ]
