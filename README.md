# 🚀 Brev-ly

> Encurtador de links

---

## 📁 Estrutura do Repositório

```
.
├── web/      # Frontend — React + Vite + TypeScript
└── server/   # Backend — Fastify + TypeScript
```

---

## 🛠️ Tecnologias

### 🌐 Web (`/web`)

| Tecnologia | Versão | Descrição |
|---|---|---|
| [React](https://react.dev/) | ^19.2 | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | ~5.9 | Tipagem estática |
| [Vite](https://vitejs.dev/) | ^7.3 | Build tool e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.2 | Estilização utilitária |
| [shadcn/ui](https://ui.shadcn.com/) | ^3.8 | Componentes de UI |
| [Radix UI](https://www.radix-ui.com/) | ^1.4 | Componentes primitivos acessíveis |
| [Lucide React](https://lucide.dev/) | ^0.576 | Ícones |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/nicolo-ribaudo/tailwind-merge) | — | Utilitários de classes CSS |

### 🖥️ Server (`/server`)

| Tecnologia | Versão | Descrição |
|---|---|---|
| [Fastify](https://fastify.dev/) | ^5.7 | Framework HTTP de alta performance |
| [TypeScript](https://www.typescriptlang.org/) | ^5.9 | Tipagem estática |
| [@fastify/cors](https://github.com/fastify/fastify-cors) | ^11.2 | Plugin de CORS |
| [Zod](https://zod.dev/) | ^4.3 | Validação de schemas |
| [fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod) | ^6.1 | Integração Zod + Fastify |
| [tsx](https://tsx.is/) | ^4.21 | Execução de TypeScript no Node.js |

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [PNPM](https://pnpm.io/) >= 8

```bash
npm install -g pnpm
```

---

## 🚀 Como Rodar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências

```bash
# Instalar dependências do web
cd web
pnpm install

# Instalar dependências do server
cd ../server
pnpm install
```

### 3. Configure as variáveis de ambiente

```bash
# Em /server
cp .env.example .env

# Em /web
cp .env.example .env
```

### 4. Inicie os servidores

```bash
# Terminal 1 — Server
cd server
pnpm dev

# Terminal 2 — Web
cd web
pnpm dev
```

O frontend estará disponível em `http://localhost:5173` e o backend em `http://localhost:3000` (ou conforme configurado).

---

## 📦 Scripts Disponíveis

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
| `pnpm dev` | Inicia o servidor em modo watch com tsx |
| `pnpm test` | Executa os testes |

---

## 📄 Licença

Este projeto está sob a licença [ISC](./LICENSE).
