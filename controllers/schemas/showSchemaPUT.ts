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
        .optional({nullable:true,checkFalsy:true})
        
        ,

    check("description")
        .optional({nullable:true,checkFalsy:true})

        ,

    check("coverImg")
        .isURL()
        .withMessage("La imagen debe ser una URL")
        .optional({nullable:true,checkFalsy:true})

        ,

    check("type")
        .isIn(['Anime','OVA','Película','Especial'])
        .withMessage("Este tipo es inválido")
        .optional({nullable:true,checkFalsy:true})

        ,

    check("category")
        .isIn(categories)
        .withMessage("Esta categoría es inválida")   
        .optional({nullable:true,checkFalsy:true})
    ]
