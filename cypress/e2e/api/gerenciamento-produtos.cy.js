/// <reference types="cypress" />
import {
  UserApiService,
  ProductApiService,
} from "../../support/services/ApiServices.js";

describe("API - Cenário 2: Gerenciamento de Produtos", () => {
  let authToken;
  let createdProductId;
  let userApiService;
  let productApiService;
  let createdUserIds = [];

  beforeEach(() => {
    userApiService = new UserApiService();
    productApiService = new ProductApiService();

    const adminUser = {
      nome: "Admin Produtos",
      email: "admin.produtos@email.com",
      password: "123456",
      administrador: "true",
    };

    userApiService.createUserAndLogin(adminUser).then(({ token, userId }) => {
      authToken = token;
      createdUserIds.push(userId);
    });
  });

  it("Deve criar um novo produto com sucesso", () => {
    const productData = {
      nome: `Produto API Teste ${Date.now()}`,
      preco: 10,
      descricao: "Descrição do produto criado via API",
      quantidade: 15,
    };

    productApiService.createProduct(productData, authToken).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      expect(response.body._id).to.exist;

      createdProductId = response.body._id;
    });
  });

  it("Deve retornar erro ao tentar criar produto sem autenticação", () => {
    const productData = {
      nome: "Produto Sem Auth",
      preco: 100,
      descricao: "Produto sem autenticação",
      quantidade: 5,
    };

    let tokenInvalido = "Bearer eyJhbGciOiJIfc";

    productApiService
      .createProduct(productData, tokenInvalido)
      .then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq(
          "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"
        );
      });
  });

  it("Deve retornar erro ao tentar criar produto com dados inválidos", () => {
    const invalidProductData = {
      nome: "",
      preco: -10,
      descricao: "",
      quantidade: -5,
    };

    productApiService
      .createProduct(invalidProductData, authToken)
      .then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.nome).to.include("nome não pode ficar em branco");
        expect(response.body.preco).to.include(
          "preco deve ser um número positivo"
        );
        expect(response.body.descricao).to.include(
          "descricao não pode ficar em branco"
        );
        expect(response.body.quantidade).to.include(
          "quantidade deve ser maior ou igual a 0"
        );
      });
  });

  it("Deve listar todos os produtos", () => {
    cy.api({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/produtos`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.produtos).to.be.an("array");
      expect(response.body.quantidade).to.be.a("number");
      expect(response.body.quantidade).to.be.greaterThan(0);
    });
  });

  it("Deve buscar produto por ID", () => {
    const productData = {
      nome: `Produto Busca ${Date.now()}`,
      preco: 150,
      descricao: "Produto para busca por ID",
      quantidade: 8,
    };

    productApiService.createProduct(productData, authToken).then((response) => {
      expect(response.status).to.eq(201);
      const productId = response.body._id;

      productApiService.getProductById(productId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq(productData.nome);
        expect(response.body.preco).to.eq(productData.preco);
        expect(response.body.descricao).to.eq(productData.descricao);
        expect(response.body.quantidade).to.eq(productData.quantidade);
      });
    });
  });

  it("Deve atualizar produto existente", () => {
    const timeStamp = Date.now();

    const originalProduct = {
      nome: `Produto Original ${timeStamp}`,
      preco: 100,
      descricao: `Descrição original ${timeStamp}`,
      quantidade: 5,
    };

    const updatedProduct = {
      nome: `Produto Atualizado ${timeStamp}`,
      preco: 150,
      descricao: `Descrição atualizada ${timeStamp}`,
      quantidade: 10,
    };

    productApiService
      .createProduct(originalProduct, authToken)
      .then((createResponse) => {
        expect(createResponse.status).to.eq(201);
        createdProductId = createResponse.body._id;

        productApiService
          .updateProduct(createdProductId, updatedProduct, authToken)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq(
              "Registro alterado com sucesso"
            );
          });
      });
  });

  afterEach(() => {
    if (createdProductId) {
      cy.api({
        method: "DELETE",
        url: `${Cypress.env("apiUrl")}/produtos/${createdProductId}`,
        headers: {
          Authorization: authToken,
        },
      });
    }

    createdUserIds.forEach((userId) => {
      userApiService.deleteUser(userId);
    });
    createdUserIds = [];
  });
});
