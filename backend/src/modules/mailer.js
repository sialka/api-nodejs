const path = require('path');
const nodemailer = require('nodemailer');
// Importando template para e-mail
const hbs = require('nodemailer-express-handlebars');

// Usando desestruturação
const { host, port, user, pass } = require('../config/mail');

// console.log(host, port, user, pass);

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
});

// console.log(transport);

// Configurando o template de e-mail
const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('./src/resources/mail'),
    layoutsDir: path.resolve('./src/resources/mail'),
    defaultLayout: 'auth/forgot_password.hbs',
  },
  viewPath: path.resolve('./src/resources/mail'),
  extName: '.hbs',
};

transport.use('compile', hbs(handlebarOptions));

module.exports = transport;
