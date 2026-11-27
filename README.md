# Codeflix App

Catálogo de filmes no estilo plataforma de streaming, construído com **Next.js 16** (App Router), **React 19** e **Tailwind CSS 4**. Os dados vêm de uma API fake servida pelo **json-server** a partir do arquivo [`db.json`](db.json).

## Tecnologias

| Camada         | Ferramentas                                                              |
| -------------- | ------------------------------------------------------------------------ |
| Framework      | Next.js 16.4 (App Router, `cacheComponents`), React 19.3, TypeScript 5   |
| Estilo         | Tailwind CSS 4 (via `@tailwindcss/turbopack`), Heroicons                 |
| Player         | Video.js (`@videojs/react`)                                              |
| Validação      | Zod 4                                                                    |
| API fake       | json-server 0.17 (`db.json`)                                             |
| Testes         | Vitest 5, Testing Library, jsdom                                         |
| Qualidade      | ESLint 9 (`eslint-config-next`), Prettier + `prettier-plugin-tailwindcss` |

## Pré-requisitos

- Node.js 20 ou superior (testado com Node 24)
- npm

## Instalação

```bash
# 1. Clone o repositório
git clone git@github.com:SamuelNonoka/plataforma-de-video.git
cd plataforma-de-video

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
```

## Executando o projeto

O app depende da API fake, então são necessários **dois terminais**:

```bash
# Terminal 1 — API fake (json-server) em http://localhost:3333
npm run api

# Terminal 2 — aplicação Next.js em http://localhost:3000
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador. Sem a API no ar, a home, a busca e o player não carregam os filmes.

### Build de produção

```bash
npm run build
npm run start
```

## Scripts

| Script             | Descrição                                               |
| ------------------ | ------------------------------------------------------- |
| `npm run dev`      | Sobe o servidor de desenvolvimento do Next.js           |
| `npm run build`    | Gera o build de produção                                |
| `npm run start`    | Sobe o build de produção                                |
| `npm run api`      | Sobe o json-server na porta 3333 observando o `db.json` |
| `npm test`         | Executa os testes com Vitest                            |
| `npm run lint`     | Analisa o código com ESLint                             |
| `npm run lint:fix` | Corrige automaticamente problemas de lint               |

## Variáveis de ambiente

| Variável  | Padrão                  | Uso                                                              |
| --------- | ----------------------- | ---------------------------------------------------------------- |
| `API_URL` | `http://localhost:3333` | URL base da API de filmes, lida em [`app/service/ApiRequest.ts`](app/service/ApiRequest.ts) |

## Arquitetura

### Fluxo de dados

```
┌──────────┐     ┌───────────────────────────────┐     ┌──────────────────┐
│ Browser  │ ──► │ Next.js (Server Components)   │ ──► │ json-server      │
└──────────┘     │  page.tsx                     │     │ :3333            │
                 │   └─► service/MovieService.ts │     │  db.json         │
                 │        └─► service/ApiRequest │ ──► │   ├─ featured    │
                 │             (fetch + query)   │     │   └─ movies      │
                 └───────────────────────────────┘     └──────────────────┘
```

1. As páginas são **Server Components** assíncronos que chamam as funções de [`MovieService.ts`](app/service/MovieService.ts).
2. O `MovieService` monta as consultas (filtros `genres_like`, `title_like`) e delega para `apiRequest`.
3. [`ApiRequest.ts`](app/service/ApiRequest.ts) é um wrapper genérico de `fetch`: aplica paginação padrão (`_page=1`, `_limit=10`), monta a query string e trata erros HTTP.
4. O json-server responde com os dados do [`db.json`](db.json), tipados por [`app/types/movie.ts`](app/types/movie.ts).

### Estrutura de pastas

```
app/
├── page.tsx                 # Home: banner em destaque + linhas de filmes por gênero
├── layout.tsx               # Layout raiz
├── globals.css              # Estilos globais (Tailwind)
├── search/                  # Busca por ?title= e/ou ?genre= (+ loading.tsx)
├── watch/[id]/              # Página do player do filme (+ loading.tsx)
├── auth/                    # Login, cadastro e recuperação de senha (+ layout próprio)
├── api/auth/login/route.ts  # Route Handler POST com validação Zod
├── settings/                # Exemplos de streaming/loading, error e not-found
│   └── user/[id]/           # Rota dinâmica de usuário
├── components/              # Componentes de UI (Header, Banner, MovieRow, MovieCard,
│                            #   Player, SearchForm, NavLinks, AuthForm, InputField...)
├── service/
│   ├── ApiRequest.ts        # Cliente HTTP genérico (fetch, paginação, query string)
│   └── MovieService.ts      # getMovieById, getFeaturedMovie, getMoviesByGenre, searchMovies
├── hooks/                   # Hooks customizados (useScroll) + testes em __tests__/
├── lib/                     # Utilitários e mocks; validações Zod em validations/
└── types/movie.ts           # Tipos Movie / Movies
```

### Decisões principais

- **Busca de dados no servidor**: as páginas consomem o serviço diretamente, sem estado global no cliente. Componentes interativos (player, formulários, navegação) são marcados com `'use client'`.
- **Streaming de UI**: uso de `<Suspense>` na home e de arquivos `loading.tsx` nas rotas para exibir conteúdo progressivamente (`cacheComponents` habilitado em [`next.config.ts`](next.config.ts)).
- **Camada de serviço isolada**: toda comunicação com a API passa por `service/`, facilitando trocar o json-server por uma API real apenas alterando `API_URL`.
- **Imagens remotas**: o domínio `m.media-amazon.com` está liberado em `next.config.ts` para o `next/image`.

## Rotas

| Rota                     | Descrição                                     |
| ------------------------ | --------------------------------------------- |
| `/`                      | Home com filme em destaque e linhas por gênero |
| `/search?title=&genre=`  | Resultados de busca                           |
| `/watch/[id]`            | Player do filme                               |
| `/auth/login`            | Login                                         |
| `/auth/register`         | Cadastro                                      |
| `/auth/forgot-password`  | Recuperação de senha                          |
| `/settings`              | Configurações (exemplo de carregamento)       |
| `/settings/user/[id]`    | Dados de usuário (exemplo de rota dinâmica)   |
| `POST /api/auth/login`   | Endpoint de login com validação de e-mail/senha |

## Testes

```bash
npm test
```

Os testes rodam com Vitest em ambiente `jsdom`, com suporte aos aliases do `tsconfig.json` via `vite-tsconfig-paths` (configuração em [`vitest.config.mts`](vitest.config.mts)).
