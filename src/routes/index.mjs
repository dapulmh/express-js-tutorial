import { Router } from "express";
import userRouter from './user.mjs'
import productRouter from './product.mjs'

const router = Router();
const loggingMiddleware = (request, response, next) =>{
    console.log(`${request.method} - ${request.url}`);
    next();
};
router.use(loggingMiddleware);
router.use(userRouter);
router.use(productRouter);


export default router;