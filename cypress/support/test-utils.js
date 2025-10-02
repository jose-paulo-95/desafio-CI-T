
class TestDataGenerator {
  static generateRandomEmail() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `teste.${timestamp}.${randomNumber}@email.com`;
  }

  static generateRandomName() {
    const names = [
      "João",
      "Maria",
      "Pedro",
      "Ana",
      "Carlos",
      "Lucia",
      "Roberto",
      "Fernanda",
    ];
    const surnames = [
      "Silva",
      "Santos",
      "Oliveira",
      "Souza",
      "Costa",
      "Pereira",
      "Almeida",
      "Ferreira",
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    return `${randomName} ${randomSurname}`;
  }

  static generateRandomProductName() {
    const products = [
      "Notebook",
      "Smartphone",
      "Tablet",
      "Monitor",
      "Teclado",
      "Mouse",
      "Headset",
      "Webcam",
    ];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${randomProduct} ${randomNumber}`;
  }

  static generateRandomPrice() {
    return Math.floor(Math.random() * 1000) + 10; 
  }

  static generateRandomQuantity() {
    return Math.floor(Math.random() * 50) + 1; 
  }

  static generateUserData() {
    return {
      nome: this.generateRandomName(),
      email: this.generateRandomEmail(),
      password: "123456",
      administrador: "true",
    };
  }

  static generateProductData() {
    return {
      nome: this.generateRandomProductName(),
      preco: this.generateRandomPrice(),
      descricao: "Descrição gerada automaticamente para teste",
      quantidade: this.generateRandomQuantity(),
    };
  }
}


class ApiValidator {
  static validateUserResponse(response, expectedUser) {
    expect(response.status).to.eq(201);
    expect(response.body.message).to.eq("Cadastro realizado com sucesso");
    expect(response.body._id).to.exist;
    expect(response.body.nome).to.eq(expectedUser.nome);
    expect(response.body.email).to.eq(expectedUser.email);
    expect(response.body.administrador).to.eq(expectedUser.administrador);
  }

  static validateProductResponse(response, expectedProduct) {
    expect(response.status).to.eq(201);
    expect(response.body.message).to.eq("Cadastro realizado com sucesso");
    expect(response.body._id).to.exist;
    expect(response.body.nome).to.eq(expectedProduct.nome);
    expect(response.body.preco).to.eq(expectedProduct.preco);
    expect(response.body.descricao).to.eq(expectedProduct.descricao);
    expect(response.body.quantidade).to.eq(expectedProduct.quantidade);
  }

  static validateLoginResponse(response) {
    expect(response.status).to.eq(200);
    expect(response.body.message).to.eq("Login realizado com sucesso");
    expect(response.body.authorization).to.exist;
  }

  static validateErrorResponse(response, expectedStatus, expectedMessage) {
    expect(response.status).to.eq(expectedStatus);
    expect(response.body.message).to.eq(expectedMessage);
  }
}


class TestUtils {
  static async createUserAndLogin(userData) {
    const createResponse = await cy.api({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/usuarios`,
      body: userData,
    });

    expect(createResponse.status).to.eq(201);
    const userId = createResponse.body._id;

    const loginResponse = await cy.api({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        email: userData.email,
        password: userData.password,
      },
    });

    expect(loginResponse.status).to.eq(200);
    const token = loginResponse.body.authorization;

    return { userId, token };
  }

  static async createProduct(productData, token) {
    const response = await cy.api({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/produtos`,
      headers: {
        Authorization: token,
      },
      body: productData,
    });

    expect(response.status).to.eq(201);
    return response.body._id;
  }

  static async cleanupUser(userId) {
    if (userId) {
      await cy.api({
        method: "DELETE",
        url: `${Cypress.env("apiUrl")}/usuarios/${userId}`,
      });
    }
  }

  static async cleanupProduct(productId, token) {
    if (productId && token) {
      await cy.api({
        method: "DELETE",
        url: `${Cypress.env("apiUrl")}/produtos/${productId}`,
        headers: {
          Authorization: token,
        },
      });
    }
  }
}

export { TestDataGenerator, ApiValidator, TestUtils };
