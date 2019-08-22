const express = require('express');
// Importando o Middleware.
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Usando o Middleware neste controller.
router.use(authMiddleware);

router.get('/', (req, res) => {
  // Devolve o Id do Usuario que foi usado na geração de Token
  res.send({ ok: true, user: req.userId });
});

module.exports = app => app.use('/projects', router);
