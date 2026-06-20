# Poções & Soluções

Loja virtual de poções da bruxa Innabelle Merigold, no Beco da Última Saída.
Projeto composto por um **Web Service** (Node.js + Express + Sequelize + SQLite
em memória) e um **site em React** (Vite) com a vitrine para o comprador e uma
página de administração para cadastrar, listar e remover poções.

> Interface em português; código (variáveis, funções, comentários) em inglês.

## Funcionalidades

- **Vitrine do comprador** com descrição da loja, seção de história (fundada em
  1867) com fotos, rodapé com contato e a listagem de poções.
- Cada poção exibe **nome, imagem, descrição, preço e botão "Comprar"** (a compra
  em si não faz parte desta entrega).
- As poções são carregadas do Web Service via **JavaScript + AJAX (`fetch`)**.
- **Página de administração** para cadastrar, listar e remover poções.
- Paleta de cores **escura** e fonte clássica **Gill Sans** (com fallbacks).

## Estrutura

```
Potions/
├── backend/        Web Service (Express + Sequelize + SQLite em memória)
│   └── src/
│       ├── server.js        ponto de entrada
│       ├── database.js      conexão SQLite ":memory:"
│       ├── models/Potion.js modelo (name, description, image, price)
│       ├── seed.js          popula as 6 poções de exemplo no startup
│       ├── auth.js          login do admin + middleware de proteção
│       └── routes/          rotas /api/potions e /api/login
└── frontend/       Site em React (Vite)
    └── src/
        ├── api.js           camada AJAX (fetch) para o Web Service
        ├── pages/           HomePage (vitrine) e AdminPage (admin)
        └── components/      NavBar, Footer, PotionCard
```

## Pré-requisitos

- **Node.js v24** (testado com v24.14.0) e npm.

> O banco é **SQLite em memória** (`storage: ":memory:"`), conforme exigido pelo
> enunciado. Os dados existem apenas enquanto o servidor está em execução: a cada
> reinício o banco é recriado e as 6 poções de exemplo são inseridas novamente.

## Como executar

### 1. Instalar dependências

```bash
cd backend  && npm install
cd ../frontend && npm install
```

### Modo desenvolvimento (dois servidores)

Em dois terminais:

```bash
# Terminal 1 — Web Service em http://localhost:3001
cd backend
npm run dev        # ou: npm start

# Terminal 2 — site em http://localhost:5173
cd frontend
npm run dev
```

Acesse **http://localhost:5173**. O Vite encaminha (proxy) as chamadas `/api`
para o backend na porta 3001 automaticamente.

### Modo produção (um único servidor)

Gere o build do frontend; o backend passa a servir o site e a API na mesma porta:

```bash
cd frontend && npm run build
cd ../backend && npm start
```

Acesse **http://localhost:3001**.

## Administração

- A página de administração fica em **/admin**.
- Senha padrão: **`merigold1867`** (pode ser alterada com a variável de ambiente
  `ADMIN_PASSWORD` ao iniciar o backend).

  ```bash
  ADMIN_PASSWORD="minhaSenha" npm start
  ```

O modelo de proteção: as páginas são públicas, mas as **ações de administração**
(cadastrar e remover) exigem login e são protegidas **no servidor**. O login
devolve um token (Bearer) que o frontend envia nas requisições protegidas.

## API (Web Service)

| Método | Rota                 | Acesso   | Descrição                       |
| ------ | -------------------- | -------- | ------------------------------- |
| GET    | `/api/potions`       | público  | Lista todas as poções           |
| POST   | `/api/potions`       | admin    | Cadastra uma poção              |
| DELETE | `/api/potions/:id`   | admin    | Remove uma poção                |
| POST   | `/api/login`         | público  | Troca a senha por um token      |
| POST   | `/api/logout`        | admin    | Invalida o token atual          |

Campos de uma poção: `name`, `description`, `image` (URL/caminho) e `price`.
