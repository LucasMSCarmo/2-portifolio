DROP DATABASE IF EXISTS portfolio_db;

CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

-- Limpando tabelas antigas para recriar a estrutura completa
DROP TABLE IF EXISTS projetos_tecnologias, dados_pessoais, projetos, tecnologias, formacoes_academicas, soft_skills;

-- Tabela de Dados Pessoais (para a Home)
CREATE TABLE dados_pessoais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(100) NOT NULL,
    titulo_header VARCHAR(255) NOT NULL,
    imagem_avatar_url VARCHAR(255),
    titulo_principal VARCHAR(255) NOT NULL,
    subtitulo VARCHAR(255),
    citacao TEXT,
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255)
);

-- Tabela de Tecnologias (agora com categoria)
CREATE TABLE tecnologias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    icone_url VARCHAR(255),
    categoria VARCHAR(50) NOT NULL -- 'Linguagem', 'Front-end', 'Ferramenta'
);

-- Tabela de Projetos
CREATE TABLE projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    descricao_curta TEXT NOT NULL,
    descricao_completa TEXT NOT NULL,
    imagem_url VARCHAR(255),
    link_repositorio VARCHAR(255)
);

-- Tabela de Associação (Projetos <-> Tecnologias)
CREATE TABLE projetos_tecnologias (
    projeto_id INT,
    tecnologia_id INT,
    PRIMARY KEY (projeto_id, tecnologia_id),
    FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE,
    FOREIGN KEY (tecnologia_id) REFERENCES tecnologias(id) ON DELETE CASCADE
);

-- NOVA: Tabela de Formação Acadêmica
CREATE TABLE formacoes_academicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    instituicao VARCHAR(100) NOT NULL,
    curso VARCHAR(100) NOT NULL,
    localizacao VARCHAR(100),
    periodo VARCHAR(50),
    ordem INT DEFAULT 0
);

-- NOVA: Tabela de Soft Skills
CREATE TABLE soft_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    icone_classe VARCHAR(50),
    descricao TEXT
);


-- =================================================================
-- INSERÇÃO DE TODOS OS DADOS
-- =================================================================

-- Inserir Dados Pessoais
INSERT INTO dados_pessoais (id, nome_completo, titulo_header, imagem_avatar_url, titulo_principal, subtitulo, citacao, github_url, linkedin_url) VALUES
(1, 'Lucas Martins', 'Estudante de Desenvolvimento de Software Multiplataforma', '/imagens/eu.jpeg', 'Estudante de Tecnologia', 'FATEC e ETEC São José dos Campos', 'Atualmente me dedicando aos estudos de Desenvolvimento de Software Multiplataforma na FATEC e Desenvolvimento de Sistemas na ETEC, buscando aprender na prática como criar soluções úteis e eficientes.', 'https://github.com/LucasMSCarmo', 'https://www.linkedin.com/in/lucas-martins-2104aa172');

INSERT INTO tecnologias (nome, icone_url, categoria) VALUES
('Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'Linguagem'),
('JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'Linguagem'),
('Java', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'Linguagem'),
('TypeScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 'Linguagem'),
('HTML5', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'Front-end'),
('CSS3', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'Front-end'),
('React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'Front-end'),
('Bootstrap', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', 'Front-end'),
('Tailwind CSS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', 'Front-end'),
('GitHub', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 'Ferramenta'),
('Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 'Ferramenta'),
('VS Code', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', 'Ferramenta'),
('Vite', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg', 'Ferramenta'),
('Supabase', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', 'Ferramenta'),
('Flask', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', 'Ferramenta'),
('MySQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', 'Ferramenta'),
('Figma', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', 'Ferramenta'),
('Jira', 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/jira.svg', 'Ferramenta');

INSERT INTO projetos (id, titulo, slug, descricao_curta, descricao_completa, imagem_url, link_repositorio) VALUES
(1, 'API de Acompanhamento de Vereadores', 'api-vereadores', 'Sistema de acompanhamento legislativo com dados oficiais.', 'Oferecer aos eleitores dados claros e acessíveis para decisões informadas nas eleições municipais de São José dos Campos.', '/imagens/projetos/api-vereadores/demo.gif', 'https://github.com/matheuskarnas/API-1'),
(2, 'Plataforma de Patrocínio Helpnei', 'api-helpnei', 'Plataforma digital para marketing dos patrocinadores da empresa Helpnei.', 'Fornecer uma plataforma intuitiva para divulgar empresas patrocinadoras do programa Helpnei, destacando o impacto no empreendedorismo local.', '/imagens/projetos/api-helpnei/demo.gif', 'https://github.com/matheuskarnas/API-2');

INSERT INTO projetos_tecnologias (projeto_id, tecnologia_id)
SELECT p.id, t.id FROM projetos p, tecnologias t WHERE
(p.slug = 'api-vereadores' AND t.nome IN ('Python', 'Flask', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'GitHub', 'Figma', 'Jira', 'Tailwind CSS')) OR
(p.slug = 'api-helpnei' AND t.nome IN ('React', 'TypeScript', 'Supabase', 'Vercel', 'Tailwind CSS', 'Figma', 'GitHub', 'HTML5', 'CSS3'));

INSERT INTO formacoes_academicas (instituicao, curso, localizacao, periodo, ordem) VALUES
('FATEC SJC', 'Graduação em Desenvolvimento de Software Multiplataforma', 'São José dos Campos/SP', '2024 - 2027', 1),
('ETEC SJC', 'Técnico em Desenvolvimento de Sistemas', 'São José dos Campos/SP', '2024 - 2025', 2);

INSERT INTO soft_skills (nome, icone_classe, descricao) VALUES
('Trabalho em Equipe', 'fa-users', 'Colaboração eficaz em projetos grupais'),
('Comunicação', 'fa-comments', 'Clareza na expressão de ideias técnicas'),
('Gestão de Tempo', 'fa-clock', 'Organização de prazos e prioridades'),
('Resolução de Problemas', 'fa-lightbulb', 'Abordagem lógica para desafios complexos'),
('Adaptabilidade', 'fa-random', 'Flexibilidade para novas tecnologias'),
('Pensamento Crítico', 'fa-brain', 'Análise detalhada antes de decisões');