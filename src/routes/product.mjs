import { Router } from "express";

const router = Router();

router.get(`/api/products`, (request, response) => {
    response.send([
        {id:100, name:"Produk1"},
    ]);
});

export default router;