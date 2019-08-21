const express = require('express');
// Importanto para Encriptar/Comparar
const bcrypt = require('bcryptjs');
// Importando para usar Token
const jwt = require('jsonwebtoken');
// Importando Hash criado com MD5
const authConfig = require('../config/auth');

// 1. Disponibiliza o Schema de usuário.
const User = require('../models/user');

// 2. Essa classe habilita manipuladores de rotas modulares e montáveis.
const router = express.Router();

// FUNÇÃO - GERAR TOKEN
function generateToken(params = {}) {

  // (?) Como funciona, enviando 3 parâmetros:
  // • (id) que é único do usuário
  // • (hash) da aplicação
  // • Quando vai expirar

  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

// ROTAS

// 3. Definindo uma Rota para registrar novos usuários.
router.post('/register', async (req, res) => {

  // 3.1 Armazena o email que vem do JSON (requicisao).
  const { email } = req.body;

	try {

    // 3.2. Filtra e-mail já tiver no BD
    if (await User.findOne({ email }))
      return res.status(400).send( {error: 'User already exists'} );

    // 3.3 Usa o modelo disponibilizado para criar um novo usuário.
    const user = await User.create(req.body);

    // 3.4 Retirando o password do retorno.
    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
	}catch (err) {

		// 3.5 Caso haja erro exibe erro.
		return res.status(400).send({ error: 'Registration failed' });
	}

});

// 4. Definindo uma Rota para autenticar um usuário cadastrado.
router.post('/authenticate', async (req, res) => {
  // 4.1 Usaremos o e-mail e password para autenticar o usuário.
  const { email, password} = req.body;

  // 4.2 Busca no BD o usuário pelo e-mail que é único.
  // (*) .select('+password') Pois no Schema existe "select: false,"
  const user = await User.findOne({ email }).select('+password');

  // 4.3 Caso não exista.
  if (!user)
    return res.status(400).send({ error: 'User not found' });

  // 4.4 Caso exista. Compara password (enviado) com o do BD
  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid password' });

  // 4.5 Retirando o password do retorno.
  user.password = undefined;

  res.send({
    user,
    token: generateToken({ id: user.id }),
  });
});

/**
 * (?) O parâmetro app já está sendo enviando pelo require,
 * então todas as rotas deste controller derivarão de /auth/[...]
 */
module.exports = app => app.use('/auth', router);
