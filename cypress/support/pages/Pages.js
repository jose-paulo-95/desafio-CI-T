
class LoginPage {
  constructor() {
    this.url = '/'
    this.selectors = {
      emailInput: '[data-testid="email"]',
      passwordInput: '[data-testid="senha"]',
      loginButton: '[data-testid="entrar"]',
      registerButton: '[data-testid="cadastrar"]',
      alert: '.alert > span',
      errorMessage: '.alert-danger',
      successMessage: '.alert-success'
    }
  }

  visit() {
    cy.visit(this.url)
    return this
  }

  fillEmail(email) {
    cy.fillFormField(this.selectors.emailInput, email)
    return this
  }

  fillPassword(password) {
    cy.fillFormField(this.selectors.passwordInput, password)
    return this
  }

  clickLoginButton() {
    cy.get(this.selectors.loginButton).click()
    return this
  }

  clickRegisterButton() {
    cy.get(this.selectors.registerButton).click()
    return this
  }

  login(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.clickLoginButton()
    return this
  }

  checkErrorMessage(message) {
    cy.checkErrorMessage(message)
    return this
  }

  checkSuccessMessage(message) {
    cy.checkSuccessMessage(message)
    return this
  }

  checkRequiredFields() {
    cy.get(this.selectors.alert).eq(0).contains('Nome é obrigatório')
    cy.get(this.selectors.alert).eq(1).contains('Email é obrigatório')
    cy.get(this.selectors.alert).eq(2).contains('Password é obrigatória')
    return this
  }

  verifyLoginSuccess() {
    cy.checkSuccessMessage('Login realizado com sucesso')
    cy.url().should('include', '/admin/home')
    cy.window().its('localStorage.token').should('exist')
    return this
  }

  verifyLoginFailure() {
    cy.checkErrorMessage('Email e/ou senha inválidos')
    cy.url().should('not.include', '/admin/home')
    cy.window().its('localStorage.token').should('not.exist')
    return this
  }
}


class RegisterPage {
  constructor() {
    this.selectors = {
      nameInput: '[data-testid="nome"]',
      emailInput: '[data-testid="email"]',
      passwordInput: '[data-testid="password"]',
      adminCheckbox: '[data-testid="checkbox"]',
      registerButton: '[data-testid="cadastrar"]',
      alert: '.alert > span',
      errorMessage: '.alert-danger',
      successMessage: '.alert-success'
    }
  }

  fillName(name) {
    cy.fillFormField(this.selectors.nameInput, name)
    return this
  }

  fillEmail(email) {
    cy.fillFormField(this.selectors.emailInput, email)
    return this
  }

  fillPassword(password) {
    cy.fillFormField(this.selectors.passwordInput, password)
    return this
  }

  checkAdminCheckbox() {
    cy.get(this.selectors.adminCheckbox).check()
    return this
  }

  clickRegisterButton() {
    cy.get(this.selectors.registerButton).click()
    return this
  }

  register(name, email, password, isAdmin = false) {
    this.fillName(name)
    this.fillEmail(email)
    this.fillPassword(password)
    if (isAdmin) {
      this.checkAdminCheckbox()
    }
    this.clickRegisterButton()
    return this
  }

  checkErrorMessage(message) {
    cy.checkErrorMessage(message)
    return this
  }

  checkSuccessMessage(message) {
    cy.checkSuccessMessage(message)
    return this
  }

  checkRequiredFields() {
    cy.get(this.selectors.alert).eq(0).contains('Nome é obrigatório')
    cy.get(this.selectors.alert).eq(1).contains('Email é obrigatório')
    cy.get(this.selectors.alert).eq(2).contains('Password é obrigatório')
    return this
  }

  verifyRegistrationSuccess() {
    cy.checkSuccessMessage('Cadastro realizado com sucesso')
    cy.url().should('include', '/admin/home')
    return this
  }
}


class ProductPage {
  constructor() {
    this.selectors = {
      createProductButton: '[data-testid="cadastrar-produtos"]',
      listProductsButton: '[data-testid="listar-produtos"]',
      nameInput: '[data-testid="nome"]',
      priceInput: '[data-testid="preco"]',
      descriptionInput: '[data-testid="descricao"]',
      quantityInput: '[data-testid="quantity"]',
      alert: '.alert > span',
      createButton: '[data-testid="cadastarProdutos"]',
      editButton: '[data-testid="editar"]',
      deleteButton: '[data-testid="excluir"]',
      confirmDeleteButton: '[data-testid="confirmar-exclusao"]',
      errorMessage: '.alert-danger',
      successMessage: '.alert-success'
    }
  }

  clickCreateProductButton() {
    cy.get(this.selectors.createProductButton).click()
    return this
  }

  clickListProductsButton() {
    cy.get(this.selectors.listProductsButton).click()
    return this
  }

  fillProductName(name) {
    cy.fillFormField(this.selectors.nameInput, name)
    return this
  }

  fillProductPrice(price) {
    cy.fillFormField(this.selectors.priceInput, price.toString())
    return this
  }

  fillProductDescription(description) {
    cy.fillFormField(this.selectors.descriptionInput, description)
    return this
  }

  fillProductQuantity(quantity) {
    cy.fillFormField(this.selectors.quantityInput, quantity.toString())
    return this
  }

  clickCreateButton() {
    cy.get(this.selectors.createButton).click()
    return this
  }

  createProduct(name, price, description, quantity) {
    this.fillProductName(name)
    this.fillProductPrice(price)
    this.fillProductDescription(description)
    this.fillProductQuantity(quantity)
    this.clickCreateButton()
    return this
  }


  editProduct(productName) {
    cy.contains(productName).parent().find(this.selectors.editButton).click()
    return this
  }

  deleteProduct(productName) {
    cy.contains(productName).parent().find(this.selectors.deleteButton).click()
    return this
  }

  confirmDeletion() {
    cy.get(this.selectors.confirmDeleteButton).click()
    return this
  }

  checkRequiredFields() {
    cy.get(this.selectors.alert).eq(0).contains('Nome é obrigatório')
    cy.get(this.selectors.alert).eq(1).contains('Preco é obrigatório')
    cy.get(this.selectors.alert).eq(2).contains('Descricao é obrigatório')
    cy.get(this.selectors.alert).eq(3).contains('Quantidade é obrigatório')
    return this
  }


  verifyProductInList(productName, price, quantity) {
    cy.contains(productName).should('be.visible')
    cy.contains(price.toString()).should('be.visible')
    cy.contains(quantity.toString()).should('be.visible')
    return this
  }

  verifyProductNotInList(productName) {
    cy.contains(productName).should('not.exist')
    return this
  }
}


class HomePage {
  constructor() {
    this.selectors = {
      homeElement: '[data-testid="home"]',
      logoutButton: '[data-testid="logout"]',
      welcomeMessage: 'Bem-vindo'
    }
  }

  checkWelcomeMessage() {
    cy.contains(this.selectors.welcomeMessage).should('be.visible')
    return this
  }

  clickLogoutButton() {
    cy.get(this.selectors.logoutButton).click()
    return this
  }

  verifyLogoutSuccess() {
    cy.url().should('include', '/login')
    cy.window().its('localStorage.token').should('not.exist')
    cy.get('[data-testid="entrar"]').should('be.visible')
    return this
  }

  verifyHomePageLoaded() {
    cy.get(this.selectors.homeElement).should('be.visible')
    this.checkWelcomeMessage()
    return this
  }
}


export { LoginPage, RegisterPage, ProductPage, HomePage }
