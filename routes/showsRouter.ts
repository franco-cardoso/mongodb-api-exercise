import express from 'express'

const showsRouter = express.Router();

showsRouter.get('/')
showsRouter.get('/:id')

export default showsRouter;
