const pool = require('../config/db');

const obterDadosPessoais = async () => {
  const [rows] = await pool.query('SELECT * FROM dados_pessoais LIMIT 1');
  return rows[0];
};

const obterTodasTecnologias = async () => {
  const [rows] = await pool.query('SELECT * FROM tecnologias ORDER BY nome ASC');
  return rows;
};

const obterTodosProjetos = async () => {
  const [rows] = await pool.query('SELECT id, titulo, slug, descricao_curta, imagem_url FROM projetos ORDER BY id');
  return rows;
};

const obterTecnologiasPorProjetoId = async (projetoId) => {
  const [rows] = await pool.query(
    'SELECT t.nome, t.icone_url FROM tecnologias t JOIN projetos_tecnologias pt ON t.id = pt.tecnologia_id WHERE pt.projeto_id = ?',
    [projetoId]
  );
  return rows;
};

const obterProjetoPorSlug = async (slug) => {
  const [projetoRows] = await pool.query('SELECT * FROM projetos WHERE slug = ?', [slug]);
  const projeto = projetoRows[0];
  if (!projeto) return null;
  
  const tecnologias = await obterTecnologiasPorProjetoId(projeto.id);
  projeto.tecnologias = tecnologias;
  return projeto;
};

const obterProjetoPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM projetos WHERE id = ?', [id]);
  return rows[0];
};

const criarProjeto = async (projeto) => {
  const { titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio } = projeto;
  const [result] = await pool.query(
    'INSERT INTO projetos (titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio) VALUES (?, ?, ?, ?, ?, ?)',
    [titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio]
  );
  return { id: result.insertId, ...projeto };
};

const atualizarProjeto = async (id, projeto) => {
  const { titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio } = projeto;
  const [result] = await pool.query(
    'UPDATE projetos SET titulo = ?, slug = ?, descricao_curta = ?, descricao_completa = ?, imagem_url = ?, link_repositorio = ? WHERE id = ?',
    [titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio, id]
  );
  return result.affectedRows > 0;
};

const deletarProjeto = async (id) => {
  const [result] = await pool.query('DELETE FROM projetos WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

const obterFormacoesAcademicas = async () => {
  const [rows] = await pool.query('SELECT * FROM formacoes_academicas ORDER BY ordem ASC');
  return rows;
};

const obterSoftSkills = async () => {
  const [rows] = await pool.query('SELECT * FROM soft_skills');
  return rows;
};

module.exports = {
  obterDadosPessoais,
  obterTodasTecnologias,
  obterTodosProjetos,
  obterProjetoPorSlug,
  obterFormacoesAcademicas,
  obterSoftSkills,
};