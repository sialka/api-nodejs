const express = require('express');
// Importanto para Encriptar/Comparar
const bcrypt = require('bcryptjs');
// Importando para usar Token
const jwt = require('jsonwebtoken');
// Importando crypto para gerar Token
const crypto = require('crypto');
// Importando Template de e-mail
const mailer = require('../../modules/mailer');

// Importando Hash criado com MD5
const authConfig = require('../../config/auth.json');

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


// 5. Definindo a Rota "esqueci a minha senha"
router.post('/forgot_password', async (req, res) => {

  // Recebendo e-mail por onde receberá instruções.
  const { email } = req.body;

  try {
    // Procurando e-mail no BD
    const user = await User.findOne({ email });

    // Caso o e-mail não exista
    if (!user)
      return res.status(400).send({ error: 'User not found' });

    // Gerando Token para recuperação de senha.
    const token = crypto.randomBytes(20).toString('hex');

    // Tempo de 1 hora para expirar o Token
    const now = new Date();
    now.setHours(now.getHours() + 1);

    // Salvando o Token no usuário do BD.
    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    });

    // console.log(token, now);

    // Enviando o E-mail com o Token
    mailer.sendMail({
      to: email,
      from: 'sialkas@gmail.com',
      subject: 'Message',
      template: 'auth/forgot_password',
      context: { token },
    }, (err, info) => {

      // console.log("Error: ", err);
      // console.log("Infor: ", info);

      if (err)
        return res.status(400).send({ error: 'Cannot send forgot Token mail' });

      return res.send({ msg: 'Sended successful' });
    })
  } catch (err) {
    console.log(err);

    res.status(400).send({ error: 'Erro on forgot password, try again' });
  }
});

// 6. Definindo a Rota "resete de senha"
router.post('/reset_password', async (req, res) => {
  // Recebendo dados da requisição
  const { email, token, password } = req.body;

  try {
    // Buscando usuário
    // (?) .select para mostra os campos na busca,
    // pois os mesmo estão desabilitados na exibição.
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires');

    // 1ª Verificação: O usuário existe.
    if (!user)
      return res.status(400).send({ error: 'User not found' });

    // 2ª Verificação: O Token é valido.
    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: 'Token invalid' });

    // 3ª Verificação: O Token expirou.
    const now = new Date();
    if (now > user.passwordResetExpires)
      return res.status(400).send({ error: 'Token expired, generate a new one' });

    user.password = password;

    await user.save();

    res.status(201).send({ user: 'User changed successfully'})

  } catch (err) {
    res.status(400).send({ error: 'Cannot reset password, try again' });
  }

});

/**
 * (?) O parâmetro app já está sendo enviando pelo require,
 * então todas as rotas deste controller derivarão de /auth/[...]
 */
module.exports = app => app.use('/auth', router);
