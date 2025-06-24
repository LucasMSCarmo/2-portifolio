const express = require('express');
const router = express.Router();
const portfolioService = require('../services/portfolioService');

router.get('/projetos', async (req, res) => {
  try {
    const projetos = await portfolioService.obterTodosProjetos();
    res.json(projetos);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/projetos/:id', async (req, res) => {
  try {
    const projeto = await portfolioService.obterProjetoPorId(req.params.id);
    if (projeto) res.json(projeto);
    else res.status(404).json({ message: 'Projeto não encontrado.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/projetos', async (req, res) => {
  try {
    const novoProjeto = await portfolioService.criarProjeto(req.body);
    res.status(201).json(novoProjeto);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/projetos/:id', async (req, res) => {
  try {
    const sucesso = await portfolioService.atualizarProjeto(req.params.id, req.body);
    if (sucesso) res.json({ message: 'Projeto atualizado com sucesso.' });
    else res.status(404).json({ message: 'Projeto não encontrado.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/projetos/:id', async (req, res) => {
  try {
    const sucesso = await portfolioService.deletarProjeto(req.params.id);
    if (sucesso) res.json({ message: 'Projeto deletado com sucesso.' });
    else res.status(404).json({ message: 'Projeto não encontrado.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;