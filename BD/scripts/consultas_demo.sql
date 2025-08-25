-- 5 usuários mais recentes
SELECT id, nome, email, data_criacao
FROM usuarios
ORDER BY data_criacao DESC
LIMIT 5;
