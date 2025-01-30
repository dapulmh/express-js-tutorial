import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { mockUsers } from "../utils/constant.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middleware.mjs";

const router = Router();

router.get(`/api/users`,  query('filter').isString().withMessage('Must be not string').notEmpty().withMessage('Must be not empty').isLength({min:3, max:10}).withMessage("Must be 3 - 10 character"), (request, response) =>{

    const result = validationResult(request);
    console.log(result);
    const {query : {filter, value}} = request;
    if(!filter && !value) return response.send(mockUsers);

    if(filter && value) return response.send(mockUsers.filter((user)=> user[filter].includes(value)));
    return response.sendStatus(200);}
);

router.get(`/api/users/:id`,resolveIndexByUserId, (request, response) => {
    const {findUserIndex} = request;
    const findUser = mockUsers[findUserIndex];
    if(!findUser) return response.sendStatus(404);
    return response.send(findUser);
});

router.post(`/api/users`, checkSchema(createUserValidationSchema),
    (request, response) => {

    console.log(request.body);

    const result = validationResult(request);
    console.log(result);

    if(!result.isEmpty()){
        return response.status(400).send({errors : result.array()})
    }
    const data = matchedData(request);

    console.log(data);
    const newUser = {id: mockUsers[mockUsers.length - 1].id + 1, ...data};
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
});

router.put(`/api/users/:id`, resolveIndexByUserId,  (request, response) => {
    const {body, findUserIndex} = request;
    mockUsers[findUserIndex] = {id: mockUsers[findUserIndex].id, ...body};
    return response.sendStatus(200);
});


router.patch(`/api/users/:id`, resolveIndexByUserId, (request, response) => {
    const {body, findUserIndex} = request;
    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};

    return response.sendStatus(200);
});

router.delete(`/api/users/:id`, (request, response) => {
    const {findUserIndex} = request;

    mockUsers.splice(findUserIndex);

    return response.sendStatus(200);
});


export default router;
