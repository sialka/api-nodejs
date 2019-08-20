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
- [ ] Autenticação
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

**?. Subindo a _API_**

$ node src/index.js

## **DataBase**

**./src/database/index.js**

É a parte responsavel pela conexão como banco de dados.

## **Models**

**./src/models/user.js**

É onde fica armazenado o modelo de dados a ser usando no MongoDB.

## **Controllers**´

**./src/controllers/authController.js**

Aqui será tratado a camada que irá interagir com entre BD e Servidor.
