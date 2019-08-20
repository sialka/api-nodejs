const mongoose = require('mongoose');

// 1. Fazendo a conexão
mongoose.connect('mongodb://localhost/noderest', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

module.exports = mongoose;
