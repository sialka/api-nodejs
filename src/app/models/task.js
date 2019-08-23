// 1. Importando conexão com BD
const mongoose = require('../../database');

// 3. Definindo Schema para uso no BD
const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
  },
  project: {
		type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
	assignedTo: {
		type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
		type: Date,
		default: Date.now,
	},
});

// 4. Informamos o Schema para o BD
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
