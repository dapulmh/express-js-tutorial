import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 1000;
app.use(express.json());
app.use(cookieParser("hello"));
app.use(session(
    {secret : 'daffa the dev',
    saveUninitialized : false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    },

    }
));
app.use(routes);


app.listen(PORT, () => {
    console.log(`RUNNING IN ${PORT}`);
});



app.get(`/`, (request, response) =>{
    console.log(request.session);
    console.log(request.sessionID);
    request.session.visited = true;
    response.cookie(`hello`, 'world', {maxAge : 30000, signed : true});
    response.status(201).send({msg:"HELLO"});
});


// localhost:1000
