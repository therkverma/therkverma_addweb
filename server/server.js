import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { SESSION_SECRET, SESSION_AGE, PORT } from './src/config/constants';

import routes from './src/routes';

const app = express();

app.use(session({
    secret: SESSION_SECRET, // session secret
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: SESSION_AGE } // In MilliSeconds
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(require('path').join(__dirname, '/')))
app.use('/v2/api', routes);

app.listen(PORT, err => {
    if (err) console.log(`Error while starting server - ${err}`);
    else console.log(`server running at port ${PORT}`);
});