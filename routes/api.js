const express = require('express');
const router = express.Router();
const portfolioService = require('../services/portfolioService');

// Middleware genérico de erro para rotas da API
const handleApiError = (err, res, entity) => {
    console.error(`Erro ao manipular ${entity}:`, err);
    res.status(500).json({ message: `Erro no servidor ao manipular ${entity}.` });
};

// --- DADOS PESSOAIS ---
router.get('/dados-pessoais', async (req, res) => {
    try {
        const dados = await portfolioService.obterDadosPessoais();
        res.json(dados);
    } catch (err) { handleApiError(err, res, 'dados pessoais'); }
});
router.put('/dados-pessoais', async (req, res) => {
    try {
        const sucesso = await portfolioService.atualizarDadosPessoais(req.body);
        if (sucesso) res.json({ message: 'Dados pessoais atualizados com sucesso.' });
        else res.status(400).json({ message: 'Não foi possível atualizar os dados pessoais.' });
    } catch (err) { handleApiError(err, res, 'dados pessoais'); }
});


// --- PROJETOS ---
router.get('/projetos', async (req, res) => {
    try {
        const projetos = await portfolioService.obterTodosProjetos();
        res.json(projetos);
    } catch (err) { handleApiError(err, res, 'projetos'); }
});
router.get('/projetos/:id', async (req, res) => {
    try {
        const projeto = await portfolioService.obterProjetoPorId(req.params.id);
        if (projeto) res.json(projeto);
        else res.status(404).json({ message: 'Projeto não encontrado.' });
    } catch (err) { handleApiError(err, res, 'projetos'); }
});
router.post('/projetos', async (req, res) => {
    try {
        const novoProjeto = await portfolioService.criarProjeto(req.body);
        res.status(201).json(novoProjeto);
    } catch (err) { handleApiError(err, res, 'projetos'); }
});
router.put('/projetos/:id', async (req, res) => {
    try {
        const sucesso = await portfolioService.atualizarProjeto(req.params.id, req.body);
        if (sucesso) res.json({ message: 'Projeto atualizado com sucesso.' });
        else res.status(404).json({ message: 'Projeto não encontrado.' });
    } catch (err) { handleApiError(err, res, 'projetos'); }
});
router.delete('/projetos/:id', async (req, res) => {
    try {
        const sucesso = await portfolioService.deletarProjeto(req.params.id);
        if (sucesso) res.json({ message: 'Projeto deletado com sucesso.' });
        else res.status(404).json({ message: 'Projeto não encontrado.' });
    } catch (err) { handleApiError(err, res, 'projetos'); }
});


// --- FORMAÇÃO ACADÊMICA ---
router.get('/formacoes', async (req, res) => {
    try {
        const formacoes = await portfolioService.obterFormacoesAcademicas();
        res.json(formacoes);
    } catch (err) { handleApiError(err, res, 'formações'); }
});
router.post('/formacoes', async (req, res) => {
    try {
        const novaFormacao = await portfolioService.criarFormacao(req.body);
        res.status(201).json(novaFormacao);
    } catch (err) { handleApiError(err, res, 'formações'); }
});
router.put('/formacoes/:id', async (req, res) => {
    try {
        const sucesso = await portfolioService.atualizarFormacao(req.params.id, req.body);
        if (sucesso) res.json({ message: 'Formação atualizada com sucesso.' });
        else res.status(404).json({ message: 'Formação não encontrada.' });
    } catch (err) { handleApiError(err, res, 'formações'); }
});
router.delete('/formacoes/:id', async (req, res) => {
    try {
        const sucesso = await portfolioService.deletarFormacao(req.params.id);
        if (sucesso) res.json({ message: 'Formação deletada com sucesso.' });
        else res.status(404).json({ message: 'Formação não encontrada.' });
    } catch (err) { handleApiError(err, res, 'formações'); }
});


// --- SOFT SKILLS ---
router.get('/soft-skills', async (req, res) => {
    try {
        const skills = await portfolioService.obterSoftSkills();
        res.json(skills);
    } catch (err) { handleApiError(err, res, 'soft skills'); }
});
router.post('/soft-skills', async (req, res) => {
    try {
        const novaSkill = await portfolioService.criarSoftSkill(req.body);
        res.status(201).json(novaSkill);
    } catch (err) { handleApiError(err, res, 'soft skills'); }
});
router.put('/soft-skills/:id', async (req, res) => {
    try {
        const sucesso = await portfolioService.atualizarSoftSkill(req.params.id, req.body);
        if (sucesso) res.json({ message: 'Soft skill atualizada com sucesso.' });
        else res.status(404).json({ message: 'Soft skill não encontrada.' });
    } catch (err) { handleApiError(err, res, 'soft skills'); }
});
router.delete('/soft-skills/:id', async (req, res) => {
    try {
        const sucesso = await portfolioService.deletarSoftSkill(req.params.id);
        if (sucesso) res.json({ message: 'Soft skill deletada com sucesso.' });
        else res.status(404).json({ message: 'Soft skill não encontrada.' });
    } catch (err) { handleApiError(err, res, 'soft skills'); }
});


// --- TECNOLOGIAS ---
router.get('/tecnologias', async (req, res) => {
    try {
        const tecnologias = await portfolioService.obterTodasTecnologias();
        res.json(tecnologias);
    } catch (err) { handleApiError(err, res, 'tecnologias'); }
});
router.post('/tecnologias', async (req, res) => {
    try {
        const novaTecnologia = await portfolioService.criarTecnologia(req.body);
        res.status(201).json(novaTecnologia);
    } catch (err) { handleApiError(err, res, 'tecnologias'); }
});
router.put('/tecnologias/:id', async (req, res) => {
    try {
        const sucesso = await portfolioService.atualizarTecnologia(req.params.id, req.body);
        if (sucesso) res.json({ message: 'Tecnologia atualizada com sucesso.' });
        else res.status(404).json({ message: 'Tecnologia não encontrada.' });
    } catch (err) { handleApiError(err, res, 'tecnologias'); }
});
router.delete('/tecnologias/:id', async (req, res) => {
    try {
        const sucesso = await portfolioService.deletarTecnologia(req.params.id);
        if (sucesso) res.json({ message: 'Tecnologia deletada com sucesso.' });
        else res.status(404).json({ message: 'Tecnologia não encontrada.' });
    } catch (err) { handleApiError(err, res, 'tecnologias'); }
});

module.exports = router;