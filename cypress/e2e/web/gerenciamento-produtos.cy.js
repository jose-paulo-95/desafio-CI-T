/// <reference types="cypress" />

import {
  LoginPage,
  RegisterPage,
  ProductPage,
  HomePage,
} from "../../support/pages/Pages.js";

import {
  UserApiService,
  ProductApiService,
} from "../../support/services/ApiServices.js";

describe("Frontend - Cenário 3: Gerenciamento de Produtos", () => {
  let loginPage;
  let productPage;
  let homePage;
  let userApiService;
  let productApiService;
  let authToken;
  let createdProductId;
  let createdUserIds = [];

  beforeEach(() => {
    loginPage = new LoginPage();
    productPage = new ProductPage();
    homePage = new HomePage();
    userApiService = new UserApiService();
    productApiService = new ProductApiService();

    loginPage.visit();
    cy.cleanupTestData();

    const adminUser = {
      nome: "Admin Produtos",
      email: "admin.produtos@email.com",
      password: "123456",
      administrador: "true",
    };

    userApiService.createUserAndLogin(adminUser).then(({ token, userId }) => {
      authToken = token;
  
      window.localStorage.setItem("serverest/userToken", token);
      window.localStorage.setItem("serverest/userEmail", adminUser.email);
      window.localStorage.setItem("serverest/userNome", adminUser.nome);
      createdUserIds.push(userId);
    });
  });

  it("Deve cadastrar um novo produto com sucesso", () => {
   
    cy.visit("/admin/home");
    const productData = {
      nome: "Produto Frontend Teste",
      preco: 299,
      descricao: "Descrição do produto criado via frontend",
      quantidade: 15,
    };

   
    productPage.clickCreateProductButton();
    productPage.createProduct(
      productData.nome,
      productData.preco,
      productData.descricao,
      productData.quantidade
    );


    productPage.clickListProductsButton();
    productPage.verifyProductInList(
      productData.nome,
      productData.preco,
      productData.quantidade
    );


    productApiService.findProductByName(productData.nome).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
      expect(response.body.produtos).to.be.an("array").and.not.empty;
      const produtoEncontrado = response.body.produtos.find(
        (produto) => produto.nome === productData.nome
      );
      expect(produtoEncontrado.nome).to.eq(productData.nome);
      expect(produtoEncontrado.preco).to.eq(productData.preco);
      expect(produtoEncontrado.descricao).to.eq(productData.descricao);
      expect(produtoEncontrado.quantidade).to.eq(productData.quantidade);
      
      createdProductId = produtoEncontrado._id;
    });
  
  });

  it("Deve exibir erro ao tentar cadastrar produto com dados inválidos", () => {
    cy.visit("/admin/home");
    productPage.clickCreateProductButton();
    productPage.clickCreateButton();
    productPage.checkRequiredFields();
  });

  afterEach(() => {
    if (createdProductId && authToken) {
      productApiService.deleteProduct(createdProductId, authToken);
    }
    createdUserIds.forEach((userId) => {
      userApiService.deleteUser(userId);
    });
    createdUserIds = [];
  });
});
