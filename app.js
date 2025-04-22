require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas principais
app.get('/', (req, res) => res.render('pages/index', { 
  title: 'Lucas Martins | Portfólio'
}));

app.get('/curriculo', (req, res) => res.render('pages/curriculo', {
  title: 'Currículo | Lucas Martins'
}));

// Página de listagem de projetos
app.get('/projetos', (req, res) => res.render('pages/projetos', {
  title: 'Meus Projetos'
}));

// Páginas individuais dos projetos
app.get('/projetos/api-vereadores', (req, res) => {
  res.render('pages/projetos/api-vereadores', {
    title: 'API de Vereadores | Meus Projetos'
  });
});

app.get('/projetos/api-helpnei', (req, res) => {
  res.render('pages/projetos/api-helpnei', {
    title: 'API Helpnei | Meus Projetos'
  });
});

// Página 404
app.use((req, res) => {
  res.status(404).render('pages/erro', {
    title: 'Página não encontrada',
    mensagem: 'A página que você está procurando não existe.'
  });
});

// Página 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/erro', {
    title: 'Erro no servidor',
    mensagem: 'Ocorreu um erro inesperado no servidor.'
  });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
