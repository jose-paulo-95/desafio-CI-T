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

describe("Frontend - Cenário 1: Cadastro de Usuário", () => {
  let loginPage;
  let registerPage;
  let userApiService;
  let createdUserIds = [];

  beforeEach(() => {
    loginPage = new LoginPage();
    registerPage = new RegisterPage();
    userApiService = new UserApiService();

    cy.intercept("POST", "**/usuarios").as("createUser");
    failOnStatusCode: false;
    loginPage.visit();
  });

  it("Deve cadastrar um novo usuário com sucesso", () => {
    const userData = {
      nome: "João Silva",
      email: "joao.silva@email.com",
      password: "123456",
      administrador: "true",
    };

    loginPage.clickRegisterButton();
    registerPage.register(
      userData.nome,
      userData.email,
      userData.password,
      true
    );

    registerPage.verifyRegistrationSuccess();

    cy.wait("@createUser").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.response.body.message).to.eq(
        "Cadastro realizado com sucesso"
      );
      expect(interception.response.body._id).to.exist;
      const userId = interception.response.body._id;
      if (userId) {
        createdUserIds.push(userId);
      }
    });
  });

  it("Deve exibir erro ao tentar cadastrar usuário com email já existente", () => {
    const existingUser = {
      nome: "Usuário Existente",
      email: "usuario.existente@email.com",
      password: "123456",
      administrador: "true",
    };

    userApiService.createUser(existingUser).then((response) => {
      const userId = userApiService.validateUserCreation(
        response,
        existingUser
      );

      if (userId) {
        createdUserIds.push(userId);
      }
    });
    cy.visit("/");
    loginPage.clickRegisterButton();
    registerPage.register("Novo Nome", existingUser.email, "123456", true);

    registerPage.checkErrorMessage("Este email já está sendo usado");
  });

  it("Deve exibir erros de validação para campos obrigatórios", () => {
    loginPage.clickRegisterButton();
    registerPage.clickRegisterButton();

    registerPage.checkRequiredFields();
  });

  afterEach(() => {
    createdUserIds.forEach((userId) => {
      userApiService.deleteUser(userId);
    });
    createdUserIds = [];
  });
});
