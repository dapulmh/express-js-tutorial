import express from 'express';
import routes from './routes/index.mjs'

const app = express();
const PORT = process.env.PORT || 1000;
app.use(express.json());
app.use(routes);


app.listen(PORT, () => {
    console.log(`RUNNING IN ${PORT}`);
});



app.get(`/`, (request, response) =>{
    response.status(201).send({msg:"HELLO"});
});


// localhost:1000
