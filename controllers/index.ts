import { validationResult } from 'express-validator';
import showsControllers from './showsControllers'
import userControllers from './userControllers'

export {
    userControllers,
    showsControllers,
    validationFormatter
}

// formato customizado para la validacion de express-validator
const validationFormatter = validationResult.withDefaults({
    formatter: (error) => {
        return {
            message: error.msg,
            at: error.param,
        };
    },
});