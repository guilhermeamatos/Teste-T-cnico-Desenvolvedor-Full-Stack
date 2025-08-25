-- Criação da tabela usuarios (para demonstrar o que o teste pede)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Normalização com papéis (exemplo) — opcional, apenas demonstrativo
-- CREATE TABLE IF NOT EXISTS roles (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   nome VARCHAR(50) NOT NULL UNIQUE
-- );
-- ALTER TABLE usuarios
--   ADD COLUMN role_id INT NULL,
--   ADD CONSTRAINT fk_usuarios_roles
--     FOREIGN KEY (role_id) REFERENCES roles(id);


-- povoar a tabela
INSERT INTO usuarios (nome, email, senha) VALUES
('Ana Lima', 'ana.lima@example.com', 'senha123'),
('Bruno Souza', 'bruno.souza@example.com', 'senha123'),
('Carla Dias', 'carla.dias@example.com', 'senha123'),
('Diego Paz', 'diego.paz@example.com', 'senha123'),
('Eva Nunes', 'eva.nunes@example.com', 'senha123'),
('Felipe Luz', 'felipe.luz@example.com', 'senha123'),
('Gabriela Torres', 'gabriela.torres@example.com', 'senha123'),
('Henrique Alves', 'henrique.alves@example.com', 'senha123'),
('Isabela Rocha', 'isabela.rocha@example.com', 'senha123'),
('João Martins', 'joao.martins@example.com', 'senha123'),
('Karina Melo', 'karina.melo@example.com', 'senha123'),
('Lucas Pires', 'lucas.pires@example.com', 'senha123'),
('Mariana Gomes', 'mariana.gomes@example.com', 'senha123'),
('Nelson Freitas', 'nelson.freitas@example.com', 'senha123'),
('Olívia Costa', 'olivia.costa@example.com', 'senha123'),
('Paulo Ramos', 'paulo.ramos@example.com', 'senha123'),
('Rafaela Duarte', 'rafaela.duarte@example.com', 'senha123'),
('Sérgio Carvalho', 'sergio.carvalho@example.com', 'senha123'),
('Tatiane Moreira', 'tatiane.moreira@example.com', 'senha123'),
('Victor Fernandes', 'victor.fernandes@example.com', 'senha123');

