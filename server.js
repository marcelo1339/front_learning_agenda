require("dotenv").config();
const express = require('express');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const { checkRouteError, csrfMiddleware } = require('./src/middlewares/middleware');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const flash = require('connect-flash');


const app = express();
const curDir = path.resolve(__dirname);
const { csrfSynchronisedProtection } = require('./src/middlewares/csrfMiddleware');


mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    console.log("Conexão feita");
    app.emit("Pronto");
})
.catch((e) => {
    console.log(e);
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(curDir, 'public')));
app.use(helmet());

app.set('views', path.resolve(curDir, 'src', 'views'));
app.set('view engine', 'ejs');

const sessionOptions = session({
    secret: 'knskgjshgusdhpfidocsidos',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})  

app.use(sessionOptions);
app.use(flash());


app.use(csrfSynchronisedProtection);
app.use(csrfMiddleware);
app.use(checkRouteError);
app.use(routes);


app.on("Pronto", () => {
    app.listen(3000, () => {
        console.log("Executando... http://localhost:3000");
    });
});