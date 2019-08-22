# **API REST em NodeJS**

Estudo de **API REST**  com a **RocketSeat**, neste projeto usamos **NodeJS**, **Express** e **Mongo**.

## **Status**

- [x] Criar Servidor com **Express**
- [x] Conectar o servidor ao **Mongo**
- [x] Receber dados do usuário na request
- [x] Criar e Salvar usuário no Mongo
- [x] Encriptar senha
- [x] Filtrar e-mail duplicado no momento de salvar no Mongo
- [x] Criar gerador de Token
- [x] Gerar um Token na criação de usuário
- [x] Autenticar usuário
- [x] Criação de **Middlewares** para verificação do Token
- [x] Implementar esqueci a senha para o usuário
- [x] Enviar e-mail com Token para resete de senha
- [x] Mudar a senha do usuário 
- [ ] CRUD e relacionamentos com Mongo

## **Passo a Passo**

Dependências da API.

**1. Criando _package.json_**

`$ npm init -y`

**2. Instalando _Framework_**

`$ npm install express`

**3. Instalando _body-parser_**

Com esse pacote o NodeJS passa a entender as requisições e parâmetros da URI em JSON.

`$ npm install body-parser`

**4. Instalando _mongoose_**

Pacote para conectar e persistir dados no Mongo.

`$ npm install mongoose`

**5. Instalando _bcryptjs_**

Pacote para codificar texto, usaremos para codificar a senha do usuário.

`$ npm install bcryptjs`

**6. Instalando TOKEN JSON AWT**

Pacote para criação de Token de autenticação. Usaremos para autenticar a cada requisição. Será enviado no header do protocolo HTTP.

`$ npm install jsonwebtoken`

**7. Instalando FS e Path**

Esse pacotes nos permite trabalhar com arquivos e diretórios.

`$ npm install fs path`

**8. Instalando Node Mailer**

Esse pacote nos permite enviar e-mails.

`$ npm install nodemailer`

**9. Instalando Nodemailer Express HandleBars**

Esse pacote nos permite criar templates de e-mails.

`$ npm install nodemailer-express-handlebars`

**?. Subindo a _API_**

`$ node src/index.js`

# **Estrutura do Projeto**

## **<u>Models</u>**

`./src/app/models/user.js`

Contem o **schema** ou modelo de dados para armazenamento de usuários no **Mongo**.

## **<u>Controllers</u>**

`./src/app/controllers/index.js`
`./src/app/controllers/authController.js`
`./src/app/controllers/projectController.js`

Contem todos os **controllers** da API, ou seja a camada que abstrai API e Mongo.

## **<u>Middleware</u>**

`./src/app/middlewares/auth.js`

Contem instruções que devem ser executado entre o request e o controller.

## **<u>DataBase</u>**

`./src/database/index.js`

Contem instruções para fazer a conexão com o banco de dados.

## **<u>Config</u>**

`./src/config/auth.json`

Contem um **Hash** no formato **JSON** usado para criação de Token.
Esse Hash foi criada aleatória usando **MD5**.

https://www.md5hashgenerator.com/

`./src/config/mail.json`

Arquivo com as configurações para envio de e-mail.

## **<u>Modules</u>**

`./src/modules/mailer.js`

Contem as configurações para envio do envio via template.

## **<u>Resources</u>**

`./src/resources/mail/auth/forgot_password.hbs`

Nesta pasta fica armazenado o template de e-mail para recuperara a senha do usuário.

