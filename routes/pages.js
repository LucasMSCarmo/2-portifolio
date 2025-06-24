const express = require('express');
const router = express.Router();
const portfolioService = require('../services/portfolioService');
const md = require('markdown-it')({ html: true, linkify: true });

router.get('/', async (req, res, next) => {
  try {
    const dadosPessoais = await portfolioService.obterDadosPessoais();
    const tecnologias = await portfolioService.obterTodasTecnologias();
    const projetos = await portfolioService.obterTodosProjetos();
    res.render('pages/index', { pageTitle: 'Home', dadosPessoais, tecnologias, projetos });
  } catch (err) {
    console.error("ERRO DETALHADO AO CARREGAR A HOME:", err); 
    next(err);
  }
});

router.get('/projetos', async (req, res, next) => {
  try {
    const projetos = await portfolioService.obterTodosProjetos();
    res.render('pages/projetos', { pageTitle: 'Meus Projetos', projetos });
  } catch (err) { next(err); }
});

router.get('/projetos/:slug', async (req, res, next) => {
  try {
    const projeto = await portfolioService.obterProjetoPorSlug(req.params.slug);
    if (projeto) {
      res.render('pages/projeto-detalhe', { pageTitle: projeto.titulo, projeto, md });
    } else {
      const err = new Error('Not Found'); err.status = 404; next(err);
    }
  } catch (err) { next(err); }
});

router.get('/curriculo', async (req, res, next) => {
  try {
    const formacoes = await portfolioService.obterFormacoesAcademicas();
    const tecnologias = await portfolioService.obterTodasTecnologias();
    const softSkills = await portfolioService.obterSoftSkills();

    const tecnologiasAgrupadas = tecnologias.reduce((acc, tech) => {
      if (!acc[tech.categoria]) {
        acc[tech.categoria] = [];
      }
      acc[tech.categoria].push(tech);
      return acc;
    }, {});

    res.render('pages/curriculo', {
      pageTitle: 'Currículo',
      formacoes,
      tecnologiasAgrupadas,
      softSkills
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;