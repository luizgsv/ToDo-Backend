# To-Do API - Fastify + Prisma + Clean Architecture 🏗️

Este projeto é uma API de gerenciamento de tarefas (_To-Do_) usando **Fastify**, **Prisma**, **TypeScript** e o conceito de **Clean Architecture** de forma simples e organizada.

---

## 📦 Estrutura de Pastas (resumo)

```bash
src/
├── modules/
│   └── to-do/
│       ├── dtos/
│       ├── entities/
│       ├── repositories/
│       ├── routes/
│       └── usecases/
├── shared/
│   ├── errors/
│   └── lib/
└── server.ts
```

---

## 🧹 Clean Architecture Aplicada

O projeto adota os princípios da **Clean Architecture**, priorizando organização, testabilidade e independência entre as camadas:

### 🧱 Camadas principais

- **Entidades**: Regras e comportamentos de domínio.
- **UseCases**: Lógica de aplicação, orquestrando as regras do negócio.
- **Repositórios (interfaces)**: Contratos de acesso a dados.
- **Repositórios (implementações)**: Uso de Prisma para persistência.
- **Rotas**: Camada HTTP usando Fastify.

### 🔄 Inversão de dependência

As camadas de regra de negócio não conhecem nada sobre infraestrutura como Prisma ou Fastify — apenas interfaces.

### ✅ Benefícios

- Testes mais simples e independentes
- Facilita manutenção e evolução do projeto
- Troca de tecnologias sem impacto no domínio

---

## 🚀 Tecnologias Usadas

- **Node.js**
- **TypeScript**
- **Fastify**
- **Prisma ORM**
- **PostgreSQL**
- **Docker + Docker Compose**

---

## 🛠️ Como Rodar

### 🔧 Com Docker

1. Crie um arquivo `.env` com as variáveis de ambiente:

```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
```

2. Execute o projeto com:

```bash
docker-compose up
```

A aplicação estará disponível em: [http://localhost:3000/api/to-do](http://localhost:3000/api/to-do)

### 🧪 docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    image: node:22
    working_dir: /app
    volumes:
      - .:/app
    command: pnpm install && pnpm dev
    ports:
      - "3000:3000"
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    depends_on:
      - db

  db:
    image: bitnami/postgresql:latest
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    ports:
      - "5432:5432"
```

---

## 📚 Melhorias Futuras

- Adicionar autenticação de usuários
- Implementar testes automatizados
- Separar Controllers para melhorar organização da camada HTTP
- Centralizar e melhorar tratamento de erros
- Adicionar validações com `zod` (opcional no futuro)

---

## 📜 Conclusão

Este projeto serve como uma base sólida, seguindo a Clean Architecture para aplicações Node.js modernas. É modular, testável, flexível e preparado para crescer com organização e facilidade.