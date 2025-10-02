class UserApiService {
  constructor() {
    this.baseUrl = Cypress.env("apiUrl");
    this.endpoints = {
      users: "/usuarios",
      login: "/login",
    };
  }

  createUser(userData) {
    return cy.api({
      method: "POST",
      url: `${this.baseUrl}${this.endpoints.users}`,
      body: userData,
      failOnStatusCode: false,
    });
  }

  login(email, password) {
    return cy.api({
      method: "POST",
      url: `${this.baseUrl}${this.endpoints.login}`,
      body: { email, password },
      failOnStatusCode: false,
    });
  }

  getUserById(userId) {
    return cy.api({
      method: "GET",
      url: `${this.baseUrl}${this.endpoints.users}/${userId}`,
      failOnStatusCode: false,
    });
  }

  updateUser(userId, userData) {
    return cy.api({
      method: "PUT",
      url: `${this.baseUrl}${this.endpoints.users}/${userId}`,
      body: userData,
      failOnStatusCode: false,
    });
  }

  deleteUser(userId) {
    return cy.api({
      method: "DELETE",
      url: `${this.baseUrl}${this.endpoints.users}/${userId}`,
      failOnStatusCode: false,
    });
  }

  createUserAndLogin(userData) {
    return this.createUser(userData).then((createResponse) => {
      expect(createResponse.status).to.eq(201);
      const userId = createResponse.body._id;

      return this.login(userData.email, userData.password).then(
        (loginResponse) => {
          expect(loginResponse.status).to.eq(200);
          const token = loginResponse.body.authorization;

          return cy.wrap({ userId, token, userData });
        }
      );
    });
  }

  validateUserCreation(response, expectedUser) {
    expect(response.status).to.eq(201);
    expect(response.body.message).to.eq("Cadastro realizado com sucesso");
    expect(response.body._id).to.exist;
    Cypress.env("createdUserId", response.body._id);
    return response.body._id;
  }

  validateLogin(response) {
    expect(response.status).to.eq(200);
    expect(response.body.message).to.eq("Login realizado com sucesso");
    expect(response.body.authorization).to.exist;
    return response.body.authorization;
  }
}

class ProductApiService {
  constructor() {
    this.baseUrl = Cypress.env("apiUrl");
    this.endpoints = {
      products: "/produtos",
    };
  }

  createProduct(productData, token) {
    return cy.api({
      method: "POST",
      url: `${this.baseUrl}${this.endpoints.products}`,
      headers: {
        Authorization: token,
      },
      body: productData,
      failOnStatusCode: false,
    });
  }

  deleteProduct(productId, token) {
    return cy.api({
      method: "DELETE",
      url: `${this.baseUrl}${this.endpoints.products}/${productId}`,
      headers: {
        Authorization: token,
      },
      failOnStatusCode: false,
    });
  }

  getProductById(productId) {
    return cy.api({
      method: "GET",
      url: `${this.baseUrl}${this.endpoints.products}/${productId}`,
      failOnStatusCode: false,
    });
  }
  findProductByName(productName) {
    return cy.api({
      method: "GET",
      url: `${this.baseUrl}${this.endpoints.products}?nome=${productName}`,
      failOnStatusCode: false,
    });
  }
  updateProduct(productId, productData, token) {
    return cy.api({
      method: "PUT",
      url: `${this.baseUrl}${this.endpoints.products}/${productId}`,
      headers: {
        Authorization: token,
      },
      body: productData,
      failOnStatusCode: false,
    });
  }
}

export { UserApiService, ProductApiService };
