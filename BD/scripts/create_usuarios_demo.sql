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

