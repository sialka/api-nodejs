const express = require('express');
const bodyParser = require('body-parser');

// 1 - Criando o servidor NodeJS
const app = express();

// 2 - Habilitando o body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 3 - Referenciando as Rotas
require('./controllers/authController')(app);
require('./controllers/projectController')(app);

// 4 - Subindo o Servidor
app.listen(3000, () => console.log('Server Running: http://localhost:3000'));
