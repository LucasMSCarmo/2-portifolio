require('dotenv').config();
const express = require('express');
const path = require('path');
const pageRoutes = require('./routes/pages');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pageRoutes);
app.use('/api', apiRoutes);

app.use((req, res, next) => {
  const err = new Error('Página Não Encontrada');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('pages/erro', {
    pageTitle: `Erro ${err.status || 500}`,
    errorCode: err.status || 500,
    errorMessage: err.message,
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});