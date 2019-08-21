# **API REST em NodeJS**

Estudo de **API REST em NodeJS** com a Rocketseat,
neste projeto usamos NodeJS, Express e Mongo.

## **Status**

- [x] Criar Servidor
- [x] Conectar ao MongoDB
- [x] Receber dados do usuário na API
- [x] Salvar novo usuário no MongoDB
- [x] Encriptar Senha
- [x] Filtrar e-mail duplicado
- [x] Criar gerador de Token
- [x] API devolve Token na criação de usuário
- [x] API devolve Token na autenticação de usuário
- [x] Criação de Middlewares para verifição do Token
- [ ] Recuperação de senha com NodeMailer
- [ ] CRUD e relacionamentos com MongoDB

## **Passo a Passo**

**1. Criando _package.json_**

$ npm init -y

**2. Instalando _FrameWork_**

$ npm install express

**3. Instalando _body-parser_**

Com esse pacote o NodeJS passa a entender as requisições e parametros da URI em JSON.

$ npm install body-parser

**4. Instalando _mongoose_**

Pacote para conectar e persistir dados no MongoDB.

$ npm install mongoose

**5. Instalando _bcryptjs_**

Pacote para codificar texto, usaremos para codificar a senha do usuário.

$ npm install bcryptjs

**6. Instalando TOKEN JSON AWT**

Pacote para criação de token de autenticação. Usamemos para autenticar a cada requisição. Será enviado no head do protocolo HTTP.

$ npm install jsonwebtoken

**?. Subindo a _API_**

$ node src/index.js

# **Estrutura do Projeto**

## **DataBase**

**./src/database/index.js**

É a parte responsavel pela conexão como banco de dados.

## **Models**

**./src/models/user.js**

É onde fica armazenado o modelo de dados a ser usando no MongoDB.

## **Controllers**

**./src/controllers/authController.js**

Aqui será tratado a camada que irá interagir com entre BD e Servidor.

## **Config**

**./src/config/auth.json**

É onde fica o arquivo com o Hash usado na criação do Token.
Esse Hash foi criado aleatoria usando MD5.

https://www.md5hashgenerator.com/

## **Middleware**

É a interceptação do request antes de chegar no controller.
Ou seja, o middleware é executado antes do request chegar ao controller.

**./src/middlewares/auth.js**
