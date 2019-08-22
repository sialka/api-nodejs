const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

// (?) O next() só é chamado se alguma codição for satisfeita,
// com isso ele segue para o controller.
module.exports = (req, res, next) => {
  // 1. Buscando headers enviando pelo request.
  const authHeader = req.headers.authorization;

  // 2. 1ª Verifição: O Token foi informado pelo request.
  if (!authHeader)
    return res.status(401).send({ error: 'No token provided' });

  // Verificar formato do Token JWT
  // (?) Bearer hashgitanteblablablablablablablablabla

  // 3. Gerando um Array com header enviando pelo request.
  const parts = authHeader.split(' ');

  // 4. 2ª Verificação: Existem 2 partes.
  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error' });

  // 5. Desestruturando o Array.
  const [ scheme, token ] = parts;

  // 6. 3ª Verificação: Usando REGEX verifica se existe a palavra "Bearer"
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  // 7. 4ª Verificação: Verificando o Hash do Token
  // (?) Parametros:
  // 1º - Token do header
  // 2º - Hash da API
  // 3º - Callback
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' });

    // (?) decode.id, o id vem do Token gerado.
    // Incluir na req o userId que será enviado para o próximo controller.
    req.userId = decoded.id;
    return next();
  });

};
