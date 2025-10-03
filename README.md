# 🧪 Desafio CI/T - Automação E2E com Cypress

Este projeto contém testes end-to-end (E2E) automatizados para validação de funcionalidades de cadastro de usuários e gerenciamento de produtos, utilizando Cypress como framework de automação.

## 📋 Sobre o Projeto

O projeto implementa testes automatizados para a aplicação **ServeRest** (https://serverest.dev), cobrindo cenários de:

- **Cadastro de usuários** (frontend e API)
- **Gerenciamento de produtos** (frontend e API)
- **Autenticação e autorização**
- **Validações de formulários**

## 🏗️ Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── api/                    # Testes de API
│   │   └── gerenciamento-produtos.cy.js
│   └── web/                    # Testes de Interface
│       ├── cadastro-usuario.cy.js
│       └── gerenciamento-produtos.cy.js
├── support/
│   ├── commands.js             # Comandos customizados do Cypress
│   ├── pages/                  # Page Objects
│   │   └── Pages.js
│   └── services/               # Serviços de API
│       └── ApiServices.js
├── fixtures/                   # Dados de teste
└── downloads/                  # Arquivos baixados durante os testes
```

## 🚀 Tecnologias Utilizadas

- **Cypress** - Framework de automação E2E
- **JavaScript** - Linguagem de programação
- **Page Object Model** - Padrão de design para organização dos testes
- **API Testing** - Testes de integração via API

## 📦 Instalação

1. **Clone o repositório:**

   ```bash
   git clone <https://github.com/jose-paulo-95/desafio-CI-T.git>
## 🎯 Como Executar os Testes

### Executar no modo interativo (Cypress Test Runner):

```bash
npm run test:open
```

### Executar no modo headless:

```bash
npx cypress run
```

### Executar testes específicos:

```bash
# Testes de API
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"

# Testes de Frontend
npx cypress run --spec "cypress/e2e/web/**/*.cy.js"
```

## 📝 Cenários de Teste

### 🔐 Cadastro de Usuário (Frontend)

- ✅ Cadastro de novo usuário com sucesso
- ❌ Validação de email já existente
- ❌ Validação de campos obrigatórios

### 🛍️ Gerenciamento de Produtos (Frontend)

- ✅ Cadastro de novo produto
- ❌ Validação de campos obrigatórios
- ✅ Listagem de produtos

### 🔌 Gerenciamento de Produtos (API)

- ✅ Criação de produto com autenticação
- ❌ Criação sem autenticação (erro 401)
- ❌ Validação de dados inválidos (erro 400)
- ✅ Listagem de produtos
- ✅ Busca de produto por ID
- ✅ Atualização de produto

## ⚙️ Configurações

### URLs Configuradas:

- **Frontend:** https://front.serverest.dev
- **API:** https://serverest.dev

### Configurações do Cypress:

- **Viewport:** 1280x720
- **Timeouts:** 10s (comandos), 60s (carregamento de página)
- **Retry:** 2 tentativas em modo run
- **Vídeo:** Habilitado para gravação dos testes

## 🏛️ Arquitetura dos Testes

### Page Object Model

O projeto utiliza o padrão Page Object Model para melhor organização e manutenibilidade:

- **LoginPage** - Página de login
- **RegisterPage** - Página de cadastro
- **ProductPage** - Página de produtos
- **HomePage** - Página inicial

### Serviços de API

Classes especializadas para interação com APIs:

- **UserApiService** - Operações de usuário
- **ProductApiService** - Operações de produto

### Comandos Customizados

Comandos reutilizáveis para operações comuns:

- `cy.fillFormField()` - Preenchimento de campos
- `cy.checkErrorMessage()` - Verificação de mensagens de erro
- `cy.checkSuccessMessage()` - Verificação de mensagens de sucesso
- `cy.cleanupTestData()` - Limpeza de dados de teste

## 🧹 Limpeza de Dados

O projeto implementa limpeza automática de dados de teste:

- Usuários criados são deletados após cada teste
- Produtos criados são removidos após cada teste
- LocalStorage e cookies são limpos entre testes

## 📊 Relatórios e Evidências

- **Vídeos:** Gravados automaticamente em `cypress/videos/`
- **Screenshots:** Capturados em caso de falha
- **Logs:** Disponíveis no console do Cypress

## 🔧 Dependências

```json
{
  "devDependencies": {
    "cypress": "^13.0.0",
    "cypress-plugin-api": "^2.11.2"
  }
}
```

## 📈 Próximos Passos

- [ ] Implementar testes de carrinho de compras
- [ ] Adicionar testes de performance
- [ ] Configurar CI/CD pipeline
- [ ] Implementar relatórios HTML
- [ ] Adicionar testes de acessibilidade


## 📄 Licença

Este projeto está sob a licença ISC.

---

