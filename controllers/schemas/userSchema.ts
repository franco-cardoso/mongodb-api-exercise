import { check } from "express-validator";

export default [
    check("email")
        .exists()
        .notEmpty()
        .withMessage("Debes ingresar un correo")
        .isEmail()
        .normalizeEmail({ all_lowercase: true })
        .withMessage("El email ingresado es inválido"),

    check("password")
        .exists()
        .notEmpty()
        .withMessage("Debes ingresar una contraseña")
        .isStrongPassword({minSymbols:0})
        .withMessage("Contraseña inválida"),
];
