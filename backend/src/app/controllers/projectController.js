const express = require('express');
// Importando o Middleware.
const authMiddleware = require('../middlewares/auth');

// Importando Schema Project e Task
const Project = require('../models/project');
const Task = require('../models/task');

const router = express.Router();

// Usando o Middleware neste controller.
router.use(authMiddleware);


// 1. Lista todos os projetos.
router.get('/', async (req, res) => {
  try {

    // (?) .populate('user');
    // Mostra os dados completo do relacionamento
    // (?) .populate(['user','tasks']);
    // Mostra os dados completo de outros relacionamentos
    const projects = await Project.find().populate(['user','tasks']);

    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading projects' });
  }
});

// 2. Lista projeto especifico com id.
router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(['user','tasks']);

    return res.send({ project });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading project' });
  }
});

// 3. Cria novo projeto.
router.post('/', async (req, res) => {
  try {

    const { title, description, tasks } = req.body;

    // console.log(req.body);

    // 3.1 Inserir um novo item no schema Project.
    // req.body -> Dados do body (json)
    // req.userID -> Id do Authorization (middlewares)
    const project = await Project.create({ title, description, user: req.userId });

    // 3.2 Criar e adicionar tarefa(s) no schema Task.
    // Como trata-se de []

    /**
     * Exemplo A:
     * Ele salva as informações o projeto e as tarefas,
     * mas salva as referencias das tarefas no projeto.
     * /
    tasks.map(task => {
      const projectTask = new Task({ ...task, project: project._id });

      projectTask.save().then(task => project.tasks.push(task));
    });
    */

    /**
     * Exemplo B:
     * Ele salva as referências das tarefas no projeto.
     */
    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, project: project._id });

      await projectTask.save();

      project.tasks.push(projectTask);
    }));

    await project.save();

    return res.send({ project });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Error creating new project' });
  }
});

// 4. Alterar projeto.
router.put('/:projectId', async (req, res) => {
  try {

    const { title, description, tasks } = req.body;

    // 4.1 Alterando o dados do projeto.
    const project = await Project.findByIdAndUpdate(req.params.projectId, {
      title,
      description,
    }, { new: true });

    // 4.2 Excluindo as tarefas e adicionando novamente.
    project.tasks = [];
    await Task.remove({ project: project._id });

    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, project: project._id });

      await projectTask.save();

      project.tasks.push(projectTask);
    }));

    await project.save();

    return res.send({ project });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Error not exist project' });
  }
});

// 5. Delete projeto.
router.delete('/:projectId', async (req, res) => {
  try {
    await Project.findByIdAndRemove(req.params.projectId);

    return res.send({ msg: 'Project removed success' });
  } catch (err) {
    return res.status(400).send({ error: 'Error deleting project' });
  }
});

module.exports = app => app.use('/projects', router);
