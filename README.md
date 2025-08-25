# Teste Técnico – Desenvolvedor Full Stack

## 📂 Estrutura do Projeto
```.
├── BD
│   ├── docker-compose.yml
│   └── init
│       └── 00-database.sql
├── back
│   ├── package-lock.json
│   ├── package.json
│   ├── prisma
│   │   ├── migrations
│   │   │   ├── 20250824135722_init
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   └── schema.prisma
│   ├── src
│   │   ├── app.ts
│   │   ├── controllers
│   │   │   ├── auth.controller.ts
│   │   │   └── users.controller.ts
│   │   ├── docs
│   │   │   └── openapi.ts
│   │   ├── dtos
│   │   │   ├── auth
│   │   │   │   └── LoginDTO.ts
│   │   │   └── user
│   │   │       ├── CreateUserDTO.ts
│   │   │       ├── UpdateUserDTO.ts
│   │   │       └── UserViewDTO.ts
│   │   ├── entities
│   │   │   └── User.ts
│   │   ├── env.ts
│   │   ├── mappers
│   │   │   └── UserMapper.ts
│   │   ├── middlewares
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validate.ts
│   │   ├── prisma
│   │   │   └── client.ts
│   │   ├── repositories
│   │   │   └── users.repository.ts
│   │   ├── routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── index.ts
│   │   │   └── users.routes.ts
│   │   ├── schemas
│   │   │   ├── auth.schemas.ts
│   │   │   └── users.schemas.ts
│   │   ├── seedUsers.ts
│   │   ├── server.ts
│   │   └── services
│   │       ├── auth.service.ts
│   │       └── users.service.ts
│   └── tsconfig.json
└── front
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.tsx
    │   ├── api
    │   │   ├── auth.ts
    │   │   ├── http.ts
    │   │   └── users.ts
    │   ├── components
    │   │   ├── Modal.tsx
    │   │   └── RegisterForm.tsx
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── LoginPage.tsx
    │   │   ├── RegisterPage.tsx
    │   │   └── UsersListPage.tsx
    │   ├── styles
    │   │   ├── LoginPage.css
    │   │   ├── RegisterPage.css
    │   │   ├── UsersListPage.css
    │   │   └── modal.css
    │   └── vite-env.d.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

---

## ⚙️ Pré-requisitos

- Docker e Docker Compose instalados.  
- Node.js 18+ e npm.  

---

## 🐳 Subir Banco de Dados + Adminer

Dentro da pasta `BD/`, execute:

```bash
docker compose up -d
```
Isso irá subir:

MySQL acessível em localhost:3306.

Adminer acessível em http://localhost:8080.

🔑 Variáveis de Ambiente

Crie um arquivo .env na pasta back/ com o seguinte conteúdo:
```
DATABASE_URL="mysql://app:app_password@127.0.0.1:3306/teste_vaga"
JWT_SECRET="rhallycd"
PORT=3000
```
Crie também um arquivo .env na pasta front/ com:
```
VITE_API_URL=http://localhost:3000
```
▶️ Rodando o Back-end
```
cd back
npm install
npx prisma generete
npx prisma migrate dev      # aplica migrations no banco
npm run dev                 # sobe servidor em http://localhost:3000
```

▶️ Rodando o Front-end
```
cd front
npm install
npm run dev
```
A aplicação ficará disponível em:
👉 http://localhost:5173

## 🗄️ Scripts SQL Demonstrativos

Por um motivo de **facilitar a implementação da paginação e manter o schema versionado**, foi preferido utilizar o **Prisma ORM** ao invés de depender das tabelas criadas manualmente.  

Ainda assim, para cumprir os requisitos do teste técnico e demonstrar conhecimento em SQL, foram criados alguns scripts manuais.  

Eles estão localizados em **BD/scripts/**:

- **create_usuarios_demo.sql** → Criação da tabela `usuarios` e exemplo de normalização com papéis.  
- **consultas_demo.sql** → Query para listar os 5 usuários mais recentes.  
- **populate_usuarios_demo.sql** → Inserção de 20 registros falsos para testes.  

### Como executar via Adminer

1. Acesse [http://localhost:8080](http://localhost:8080).  
2. Faça login com usuário `root` e senha `root123`.  
3. **Crie um banco de dados novo** (ex.: `playgrounddb`) para não interferir no banco usado pelo Prisma (`teste_vaga`).  
4. Selecione o banco criado (`playgrounddb`).  
5. Vá em **Importar** ou **Comando SQL** e rode os scripts desejados.  

