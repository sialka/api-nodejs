// 1. Importando conexão com BD
const mongoose = require('../database');

// 2. Importando Pacote para encriptar texto.
const bcrypt = require('bcryptjs');

// 3. Definindo Schema para uso no BD
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// 3. Antes de salvar no BD executa essas instruções.
UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

// 4. Informamos o Schema para o BD
const User = mongoose.model('User', UserSchema);

module.exports = User;
