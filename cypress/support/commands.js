import "./pages/Pages";
import "./services/ApiServices";




Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    cy.api({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        email: email,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      window.localStorage.setItem("token", response.body.authorization);
    });
  });
});


Cypress.Commands.add("createUser", (userData) => {
  return cy.api({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/usuarios`,
    body: userData,
  });
});


Cypress.Commands.add("deleteUser", (userId) => {
  cy.api({
    method: "DELETE",
    url: `${Cypress.env("apiUrl")}/usuarios/${userId}`,
  });
});

Cypress.Commands.add("createProduct", (productData, token) => {
  return cy.api({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/produtos`,
    headers: {
      Authorization: token,
    },
    body: productData,
  });
});


Cypress.Commands.add("deleteProduct", (productId, token) => {
  cy.api({
    method: "DELETE",
    url: `${Cypress.env("apiUrl")}/produtos/${productId}`,
    headers: {
      Authorization: token,
    },
  });
});


Cypress.Commands.add("cleanupTestData", () => {
  cy.clearLocalStorage();
  cy.clearCookies();
});





Cypress.Commands.add("fillFormField", (selector, value) => {
  cy.get(selector).clear().type(value);
});


Cypress.Commands.add("checkErrorMessage", (message) => {
  cy.contains(message).should("be.visible");
});


Cypress.Commands.add("checkSuccessMessage", (message) => {
  cy.contains(message).should("be.visible");
});
