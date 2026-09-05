const express = require('express');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

const route = express.Router();

route.get('/', homeController.index);

// Rotas Login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);

module.exports = route;