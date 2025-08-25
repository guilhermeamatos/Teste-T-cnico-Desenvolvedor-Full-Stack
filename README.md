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