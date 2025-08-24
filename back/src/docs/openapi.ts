export const openapi = {
  openapi: "3.0.3",
  info: {
    title: "API - Teste Técnico (Users/Auth)",
    version: "1.0.0",
    description: "API de usuários com autenticação JWT, paginação e validação.",
  },
  servers: [{ url: "http://localhost:3000", description: "Dev" }],
  tags: [
    { name: "Health" },
    { name: "Auth" },
    { name: "Users" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
    },
    schemas: {
      Error: {
        type: "object",
        properties: { error: { type: "string" }, code: { type: "string" } }
      },
      ValidationError: {
        type: "object",
        properties: {
          error: { type: "string", example: "ValidationError" },
          details: {
            type: "object",
            properties: {
              fieldErrors: { type: "object", additionalProperties: { type: "array", items: { type: "string" } } },
              formErrors: { type: "array", items: { type: "string" } }
            }
          }
        }
      },
      LoginRequest: {
        type: "object",
        required: ["email", "senha"],
        properties: {
          email: { type: "string", format: "email" },
          senha: { type: "string", minLength: 6, maxLength: 100 }
        }
      },
      LoginResponse: {
        type: "object",
        properties: { token: { type: "string" } }
      },
      CreateUserRequest: {
        type: "object",
        required: ["nome", "email", "senha"],
        properties: {
          nome: { type: "string", minLength: 1, maxLength: 100 },
          email: { type: "string", format: "email" },
          senha: { type: "string", minLength: 6, maxLength: 100 }
        }
      },
      UpdateUserRequest: {
        type: "object",
        properties: {
          nome: { type: "string", minLength: 1, maxLength: 100 },
          email: { type: "string", format: "email" },
          senha: { type: "string", minLength: 6, maxLength: 100 }
        },
        additionalProperties: false
      },
      UserView: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          nome: { type: "string" },
          email: { type: "string", format: "email" },
          dataCriacao: { type: "string", format: "date-time" }
        }
      },
      PaginatedUsers: {
        type: "object",
        properties: {
          data: { type: "array", items: { $ref: "#/components/schemas/UserView" } },
          page: { type: "integer" },
          limit: { type: "integer" },
          total: { type: "integer" },
          totalPages: { type: "integer" }
        }
      }
    }
  },
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Healthcheck",
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { type: "object", properties: { ok: { type: "boolean" } } } } } }
        }
      }
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } } }
        },
        responses: {
          "200": { description: "Token", content: { "application/json": { schema: { $ref: "#/components/schemas/LoginResponse" } } } },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } } } },
          "401": { description: "Bad credentials", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } }
        }
      }
    },
    "/users": {
      get: {
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        summary: "Listar usuários (paginado)",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", minimum: 1 }, required: false },
          { name: "limit", in: "query", schema: { type: "integer", minimum: 1, maximum: 100 }, required: false },
          { name: "nome", in: "query", schema: { type: "string" }, required: false }
        ],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/PaginatedUsers" } } } },
          "401": { description: "Unauthorized", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } }
        }
      },
      post: {
        tags: ["Users"],
        summary: "Criar usuário",
        // se sua rota for protegida, adicione: security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/CreateUserRequest" } } }
        },
        responses: {
          "201": { description: "Criado", content: { "application/json": { schema: { $ref: "#/components/schemas/UserView" } } } },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } } } },
          "409": { description: "Email em uso", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } }
        }
      }
    },
    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Buscar por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/UserView" } } } },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } } } },
          "404": { description: "Não encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } }
        }
      },
      put: {
        tags: ["Users"],
        summary: "Atualizar por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateUserRequest" } } }
        },
        responses: {
          "200": { description: "OK", content: { "application/json": { schema: { $ref: "#/components/schemas/UserView" } } } },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } } } },
          "404": { description: "Não encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } }
        }
      },
      delete: {
        tags: ["Users"],
        summary: "Remover por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: {
          "204": { description: "Sem conteúdo" },
          "400": { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/ValidationError" } } } },
          "404": { description: "Não encontrado", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } }
        }
      }
    }
  }
} as const;
