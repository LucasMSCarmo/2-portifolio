const pool = require('../config/db');

const obterDadosPessoais = async () => {
    const [rows] = await pool.query('SELECT * FROM dados_pessoais LIMIT 1');
    return rows[0];
};

const atualizarDadosPessoais = async (dados) => {
    const { nome_completo, titulo_header, imagem_avatar_url, titulo_principal, subtitulo, citacao, github_url, linkedin_url } = dados;
    const [result] = await pool.query(
        'UPDATE dados_pessoais SET nome_completo = ?, titulo_header = ?, imagem_avatar_url = ?, titulo_principal = ?, subtitulo = ?, citacao = ?, github_url = ?, linkedin_url = ? WHERE id = 1',
        [nome_completo, titulo_header, imagem_avatar_url, titulo_principal, subtitulo, citacao, github_url, linkedin_url]
    );
    return result.affectedRows > 0;
};

const obterTodosProjetos = async () => {
    const [rows] = await pool.query('SELECT id, titulo, slug, descricao_curta, imagem_url FROM projetos ORDER BY id');
    return rows;
};

const obterProjetoPorId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM projetos WHERE id = ?', [id]);
    return rows[0];
};

const obterProjetoPorSlug = async (slug) => {
    const [projetoRows] = await pool.query('SELECT * FROM projetos WHERE slug = ?', [slug]);
    const projeto = projetoRows[0];
    if (!projeto) return null;

    const [tecnologias] = await pool.query(
        'SELECT t.id, t.nome, t.icone_url, t.categoria FROM tecnologias t JOIN projetos_tecnologias pt ON t.id = pt.tecnologia_id WHERE pt.projeto_id = ?',
        [projeto.id]
    );
    projeto.tecnologias = tecnologias;
    return projeto;
};

const criarProjeto = async (projeto) => {
    const { titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio, tecnologias } = projeto;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'INSERT INTO projetos (titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio) VALUES (?, ?, ?, ?, ?, ?)',
            [titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio]
        );
        const novoProjetoId = result.insertId;

        if (tecnologias && tecnologias.length > 0) {
            const insertsTecnologias = tecnologias.map(techId => [novoProjetoId, techId]);
            await connection.query(
                'INSERT INTO projetos_tecnologias (projeto_id, tecnologia_id) VALUES ?',
                [insertsTecnologias]
            );
        }

        await connection.commit();
        return { id: novoProjetoId, ...projeto };

    } catch (error) {
        await connection.rollback();
        console.error("Erro ao criar projeto:", error);
        throw error;
    } finally {
        connection.release();
    }
};

const atualizarProjeto = async (id, projeto) => {
    const { titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio, tecnologias } = projeto;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'UPDATE projetos SET titulo = ?, slug = ?, descricao_curta = ?, descricao_completa = ?, imagem_url = ?, link_repositorio = ? WHERE id = ?',
            [titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio, id]
        );

        await connection.query('DELETE FROM projetos_tecnologias WHERE projeto_id = ?', [id]);

        if (tecnologias && tecnologias.length > 0) {
            const insertsTecnologias = tecnologias.map(techId => [id, techId]);
            await connection.query(
                'INSERT INTO projetos_tecnologias (projeto_id, tecnologia_id) VALUES ?',
                [insertsTecnologias]
            );
        }

        await connection.commit();
        return result.affectedRows > 0;

    } catch (error) {
        await connection.rollback();
        console.error("Erro ao atualizar projeto:", error);
        throw error;
    } finally {
        connection.release();
    }
};

const deletarProjeto = async (id) => {
    const [result] = await pool.query('DELETE FROM projetos WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

const obterFormacoesAcademicas = async () => {
    const [rows] = await pool.query('SELECT * FROM formacoes_academicas ORDER BY ordem ASC');
    return rows;
};

const criarFormacao = async (formacao) => {
    const { instituicao, curso, localizacao, periodo, ordem } = formacao;
    const [result] = await pool.query(
        'INSERT INTO formacoes_academicas (instituicao, curso, localizacao, periodo, ordem) VALUES (?, ?, ?, ?, ?)',
        [instituicao, curso, localizacao, periodo, ordem]
    );
    return { id: result.insertId, ...formacao };
};

const atualizarFormacao = async (id, formacao) => {
    const { instituicao, curso, localizacao, periodo, ordem } = formacao;
    const [result] = await pool.query(
        'UPDATE formacoes_academicas SET instituicao = ?, curso = ?, localizacao = ?, periodo = ?, ordem = ? WHERE id = ?',
        [instituicao, curso, localizacao, periodo, ordem, id]
    );
    return result.affectedRows > 0;
};

const deletarFormacao = async (id) => {
    const [result] = await pool.query('DELETE FROM formacoes_academicas WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

const obterSoftSkills = async () => {
    const [rows] = await pool.query('SELECT * FROM soft_skills');
    return rows;
};

const criarSoftSkill = async (skill) => {
    const { nome, icone_classe, descricao } = skill;
    const [result] = await pool.query(
        'INSERT INTO soft_skills (nome, icone_classe, descricao) VALUES (?, ?, ?)',
        [nome, icone_classe, descricao]
    );
    return { id: result.insertId, ...skill };
};

const atualizarSoftSkill = async (id, skill) => {
    const { nome, icone_classe, descricao } = skill;
    const [result] = await pool.query(
        'UPDATE soft_skills SET nome = ?, icone_classe = ?, descricao = ? WHERE id = ?',
        [nome, icone_classe, descricao, id]
    );
    return result.affectedRows > 0;
};

const deletarSoftSkill = async (id) => {
    const [result] = await pool.query('DELETE FROM soft_skills WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

const obterTodasTecnologias = async () => {
    const [rows] = await pool.query('SELECT * FROM tecnologias ORDER BY categoria, nome ASC');
    return rows;
};

const criarTecnologia = async (tech) => {
    const { nome, icone_url, categoria } = tech;
    const [result] = await pool.query(
        'INSERT INTO tecnologias (nome, icone_url, categoria) VALUES (?, ?, ?)',
        [nome, icone_url, categoria]
    );
    return { id: result.insertId, ...tech };
};

const atualizarTecnologia = async (id, tech) => {
    const { nome, icone_url, categoria } = tech;
    const [result] = await pool.query(
        'UPDATE tecnologias SET nome = ?, icone_url = ?, categoria = ? WHERE id = ?',
        [nome, icone_url, categoria, id]
    );
    return result.affectedRows > 0;
};

const deletarTecnologia = async (id) => {
    const [result] = await pool.query('DELETE FROM tecnologias WHERE id = ?', [id]);
    return result.affectedRows > 0;
};


module.exports = {
    obterDadosPessoais,
    atualizarDadosPessoais,
    obterTodosProjetos,
    obterProjetoPorId,
    obterProjetoPorSlug,
    criarProjeto,
    atualizarProjeto,
    deletarProjeto,
    obterFormacoesAcademicas,
    criarFormacao,
    atualizarFormacao,
    deletarFormacao,
    obterSoftSkills,
    criarSoftSkill,
    atualizarSoftSkill,
    deletarSoftSkill,
    obterTodasTecnologias,
    criarTecnologia,
    atualizarTecnologia,
    deletarTecnologia,
};