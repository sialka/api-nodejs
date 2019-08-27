// 1. Importando conexão com BD
const mongoose = require('../../database');

// 3. Definindo Schema para uso no BD
const ProjectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
  },
	user: {
		type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tasks: [{
		type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  createdAt: {
		type: Date,
		default: Date.now,
	},
});

// 4. Informamos o Schema para o BD
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
