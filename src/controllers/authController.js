const express = require('express');

// 1. Disponibiliza o Schema de usuário
const User = require('../models/user');

// 2. Essa classe Habilita manipuladores de rota modulares e montáveis.
const router = express.Router();

// 3. Definindo uma Rota para registrar
router.post('/register', async (req, res) => {

  // 4. Armazena o email que vem do JSON (requicisao)
  const { email } = req.body;

	try {

    // 4. Filtra e-mail já tiver no BD
    if (await User.findOne({ email }))
      return res.status(400).send( {error: 'User already exists'} );

    // 5. Usa o modelo disponibilizado para criar um novo usuário.
    const user = await User.create(req.body);

    // 6. Retirando o password do retorno.
    user.password = undefined;

    return res.send({ user });
	}catch (err) {

		// 7. Caso haja erro exibe erro.
		return res.status(400).send({ error: 'Registration failed' });
	}

});

/**
 *  (*) O parâmetro app já está sendo enviando pelo require,
 * então todas as rotas deste controller derivarão de /auth/[...]
 */
module.exports = app => app.use('/auth', router);
