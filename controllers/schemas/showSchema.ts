import { check } from "express-validator";
import categories from "../../misc/categories";

// prettier-ignore
export default [
    check("title")
        .exists()    
        .notEmpty()
        .withMessage("Debes ingresar un título")
        .optional({nullable:true})
        
        ,

    check("description")
        .exists()    
        .notEmpty()
        .withMessage("Debes ingresar una descripción")
        .optional({nullable:true})

        ,

    check("coverPic")
        .exists()    
        .notEmpty()
        .withMessage("Debes elegir una imagen")
        .isURL()
        .withMessage("La imagen debe ser una URL")
        .optional({nullable:true})

        ,

    check("type")
        .exists()    
        .notEmpty()
        .withMessage("Debes elegir el tipo de show")
        .isIn(['Anime','OVA','Película','Especial'])
        .withMessage("Este tipo es inválido")
        .optional({nullable:true})

        ,

    check("category")
        .exists()    
        .notEmpty()
        .withMessage("Debes elegir la categoría")
        .isIn(categories)
        .withMessage("Esta categoría es inválida")   
        .optional({nullable:true})
    ]
