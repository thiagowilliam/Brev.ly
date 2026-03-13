# Brev-ly

> Encurtador de links

---

## Estrutura do Repositório

```
.
├── web/      # Frontend — React + Vite + TypeScript
└── server/   # Backend — Fastify + TypeScript + PostgreSQL
```

---

## Tecnologias

### Web (`/web`)

| Tecnologia | Versão | Descrição |
|---|---|---|
| React | ^19.2 | Biblioteca de UI |
| TypeScript | ~5.9 | Tipagem estática |
| Vite | ^7.3 | Build tool e dev server |
| Tailwind CSS | ^4.2 | Estilização utilitária |
| shadcn/ui | ^3.8 | Componentes de UI |
| Radix UI | ^1.4 | Componentes primitivos acessíveis |
| TanStack Query | ^5.90 | Gerenciamento de estado assíncrono |
| React Hook Form | ^7.71 | Gerenciamento de formulários |
| React Router DOM | ^7.13 | Roteamento |
| Zod | ^4.3 | Validação de schemas |
| Zustand | ^5.0 | Gerenciamento de estado global |
| Sonner | ^2.0 | Notificações toast |
| Lucide React | ^0.576 | Ícones |
| Phosphor Icons | ^2.1 | Ícones |

### Server (`/server`)

| Tecnologia | Versão | Descrição |
|---|---|---|
| Fastify | ^5.7 | Framework HTTP |
| TypeScript | ^5.9 | Tipagem estática |
| Drizzle ORM | ^0.45 | ORM e query builder |
| PostgreSQL (`postgres`) | ^3.4 | Driver do banco de dados |
| Zod | ^4.3 | Validação de schemas |
| fastify-type-provider-zod | ^6.1 | Integração Zod + Fastify |
| @fastify/cors | ^11.2 | Plugin de CORS |
| @fastify/multipart | ^9.4 | Upload de arquivos |
| @fastify/swagger + swagger-ui | ^9.7 / ^5.2 | Documentação da API |
| AWS SDK S3 | ^3.1005 | Upload para Cloudflare R2 |
| Vitest | ^4.0 | Testes |
| tsx | ^4.21 | Execução de TypeScript no Node.js |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [PNPM](https://pnpm.io/) >= 8
- [Docker](https://www.docker.com/) (para o banco de dados)

```bash
npm install -g pnpm
```

---

## Como Rodar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/brev-ly.git
cd brev-ly
```

### 2. Instale as dependências

```bash
# Web
cd web && pnpm install

# Server
cd ../server && pnpm install
```

### 3. Configure as variáveis de ambiente

Crie o arquivo `.env` dentro de `/server`:

```env
PORT=3333
NODE_ENV=development

# Database
DATABASE_URL="postgresql://docker:docker@localhost:5432/brevly"

# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY_ID=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKET=""
CLOUDFLARE_PUBLIC_URL=""
```

### 4. Suba o banco de dados

```bash
cd server
docker compose up -d
```

### 5. Execute as migrations

```bash
cd server
pnpm db:migrate
```

### 6. (Opcional) Popule o banco com dados iniciais

```bash
cd server
pnpm db:seed
```

O seed insere 10 links de exemplo:

| Short code | URL original |
|---|---|
| `google` | https://www.google.com |
| `github` | https://www.github.com |
| `youtube` | https://www.youtube.com |
| `twitter` | https://www.twitter.com |
| `linkedin` | https://www.linkedin.com |
| `reddit` | https://www.reddit.com |
| `netflix` | https://www.netflix.com |
| `amazon` | https://www.amazon.com.br |
| `notion` | https://www.notion.so |
| `figma` | https://www.figma.com |

### 7. Inicie os servidores

```bash
# Terminal 1 — Server
cd server
pnpm dev

# Terminal 2 — Web
cd web
pnpm dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3333`
- Swagger UI: `http://localhost:3333/docs`

---

## Scripts Disponíveis

### Web

| Comando | Descrição |
|---|---|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera o build de produção |
| `pnpm preview` | Visualiza o build de produção localmente |
| `pnpm lint` | Executa o ESLint |

### Server

| Comando | Descrição |
|---|---|
| `pnpm dev` | Inicia o servidor em modo watch |
| `pnpm test` | Executa os testes (ambiente de teste) |
| `pnpm test:watch` | Executa os testes em modo watch |
| `pnpm db:generate` | Gera as migrations com Drizzle Kit |
| `pnpm db:migrate` | Executa as migrations |
| `pnpm db:studio` | Abre o Drizzle Studio |
| `pnpm db:seed` | Popula o banco com dados iniciais |

---

## Licença

Este projeto está sob a licença [ISC](./LICENSE).
