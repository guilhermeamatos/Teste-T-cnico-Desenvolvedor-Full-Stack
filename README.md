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

### Como executar via Adminer

1. Acesse [http://localhost:8080](http://localhost:8080).  
2. Faça login com usuário `root` e senha `root123`.  
3. **Crie um banco de dados novo** (ex.: `playgrounddb`) para não interferir no banco usado pelo Prisma (`teste_vaga`).  
4. Selecione o banco criado (`playgrounddb`).  
5. Vá em **Importar** ou **Comando SQL** e rode os scripts desejados. 

## 📘 Decisões de Projeto e Justificativas Técnicas

Durante o desenvolvimento, foram tomadas decisões técnicas que buscam equilibrar simplicidade (por ser um projeto de teste) e boas práticas que são aplicáveis em projetos reais de porte pequeno a médio. Também foram incluídas considerações sobre como isso evoluiria em projetos maiores.

---

### 🐳 Banco de Dados (BD/)
- O **MySQL** foi orquestrado via Docker Compose, junto com o Adminer para administração rápida.  
- O arquivo `init/00-database.sql` cria apenas o **banco inicial**, sem tabelas, pois o **Prisma ORM** é responsável por aplicar migrations e manter o schema versionado.  
- Scripts manuais de criação, consulta e povoamento foram adicionados em `BD/scripts/` para cumprir os requisitos do teste técnico e demonstrar domínio em SQL. Esses scripts são executados em um banco separado (`playgrounddb`) para não afetar o banco real (`teste_vaga`).  
- **Normalização:** a tabela `usuarios` foi modelada para receber um relacionamento com a tabela `roles`, garantindo integridade referencial e eliminando redundâncias. Para papéis de usuário, preferimos criar uma tabela separada (`roles`) e relacioná-la com `usuarios` por meio de chave estrangeira. Essa decisão segue a 3FN e permite extensibilidade (por exemplo, admin, cliente, moderador).

---

### ⚙️ Back-end (back/)
- Desenvolvido em **Node.js + TypeScript**, garantindo tipagem estática e segurança em tempo de compilação.  
- Escolhemos **Prisma ORM** porque:
  - Facilita paginação (`take` e `skip`), essencial para o requisito do teste.  
  - Mantém migrations versionadas e auditáveis.  
  - Evita SQL repetitivo e facilita a manutenção em equipes.  

#### Organização das pastas
- `app.ts`: ponto de entrada principal da aplicação Express.  
- `controllers/`: recebem requisições HTTP e chamam os serviços correspondentes (`auth.controller.ts`, `users.controller.ts`).  
- `docs/`: documentação da API (ex.: `openapi.ts`).  
- `dtos/`: Data Transfer Objects para padronizar entrada/saída de dados.  
  - `auth/`: DTOs de autenticação.  
  - `user/`: DTOs relacionados a usuário (criação, atualização, visualização).  
- `entities/`: definição das entidades do domínio (ex.: `User.ts`).  
- `env.ts`: centraliza variáveis de ambiente.  
- `mappers/`: converte entidades em DTOs e vice-versa.  
- `middlewares/`: middlewares globais (autenticação JWT, validação de dados, tratamento de erros).  
- `prisma/`: configuração do client Prisma.  
- `repositories/`: camada de acesso a dados, isolando queries do restante da aplicação.  
- `routes/`: define as rotas HTTP (`auth.routes.ts`, `users.routes.ts`, `index.ts`).  
- `schemas/`: esquemas de validação de inputs (ex.: com Zod ou Joi).  
- `seedUsers.ts`: script utilitário para popular o banco de dados com usuários iniciais.  
- `server.ts`: inicializa o servidor Express.  
- `services/`: contém a lógica de negócio (`auth.service.ts`, `users.service.ts`).  
 

Essa divisão é adequada para **projetos pequenos e médios**, pois mantém clareza e isolamento de responsabilidades.  
👉 Em **projetos maiores**, seria comum adotar **arquiteturas mais robustas** como *Clean Architecture* ou *Hexagonal Architecture*, separando ainda mais as camadas (Domínio, Aplicação, Infraestrutura) e tornando-as independentes e modularizadas.

#### Proteção de rotas privadas
- Foi criada uma **rota protegida de listagem de usuários (`/users`)**.  
- A proteção acontece no middleware `auth.ts`, que valida o JWT antes de permitir o acesso.  
- Exemplo:
  ```ts
  router.get("/users", authMiddleware, usersController.list);
 ```
 Para proteger qualquer outra rota, basta aplicar o mesmo middleware na definição de rota.

Esse padrão garante escalabilidade: a lógica de validação do token fica centralizada em um ponto.


### 🎨 Front-end (`front/`)

Implementado em **React + Vite + TypeScript**

#### Organização
- `pages/`: telas principais (`LoginPage`, `RegisterPage`, `UsersListPage`).  
- `components/`: elementos reutilizáveis (`Modal`, `RegisterForm`).  
- `api/`: camada dedicada para abstrair chamadas HTTP, com `auth.ts` e `users.ts`.  
  - **Decisão técnica:** separar essa camada torna o código mais limpo e centraliza regras como adição de tokens no header.  
  - Isso segue o conceito de *service layer* no front-end.  

#### Hooks e estados

**Exemplo em `LoginPage.tsx`:**
- `useState` → controla valores de email, senha, erros e loading.  
- `useEffect` → valida o token existente e redireciona automaticamente para `/users` se já estiver válido.  
- `useNavigate` → redireciona para a tela correta após login bem-sucedido.  

**Exemplo em `UsersListPage.tsx`:**
- `useState` → controla lista de usuários, página, total de páginas, filtros e modal.  
- `useEffect` → dispara carregamento de dados quando a página ou filtro mudam.  
- `useDebounce` → evita chamadas excessivas à API enquanto o usuário digita no filtro.  
- **Integração com a API:** função `listUsers` recebe parâmetros de paginação e filtro, e retorna a lista paginada.  




