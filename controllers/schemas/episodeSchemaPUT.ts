import { check } from "express-validator";

// prettier-ignore
export default [
    check("_id")
        .not()
        .exists()
        .withMessage("No puedes cambiar el campo '_id'")
       
        ,

    check("title")
        .optional({ nullable:true,checkFalsy:true })

        ,

    check("description")
        .optional({ nullable:true,checkFalsy:true })

        ,

    check("url")
        .isURL()
        .withMessage("El video debe ser una URL válida")
        .optional({ nullable:true,checkFalsy:true })
    ]
