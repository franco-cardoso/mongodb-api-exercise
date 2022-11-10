import { check } from "express-validator";

// prettier-ignore
export default [
    check("username")
        .exists()
        .notEmpty()
        .withMessage("Debes ingresar un nombre de usuario")
        .isAlphanumeric()
        .withMessage("Tu nombre debe contener entre 3 y 16 caracteres alfanuméricos")
        .isLength({min:3,max:16})
        .withMessage("Tu nombre debe contener entre 3 y 16 caracteres alfanuméricos")

        ,

    check("email")
        .exists()
        .notEmpty()
        .withMessage("Debes ingresar un correo")
        .normalizeEmail({ all_lowercase: true })
        .isEmail()
        .withMessage("El email ingresado es inválido")
        
        ,

    check("password")
        .exists()
        .notEmpty()
        .withMessage("Debes ingresar una contraseña")
        .isStrongPassword({minSymbols:0})
        .withMessage("La contraseña debe tener al menos una letra mayúscula, una minúscula, y un número"),
];
