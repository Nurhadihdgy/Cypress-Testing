class LoginPage {
  visit() {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
  }

  getUsernameField() {
    return cy.get('input[placeholder="Username"]');
  }

  getPasswordField() {
    return cy.get('input[placeholder="Password"]');
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }

  getErrorMessage() {
    return cy.get(".oxd-alert-content");
  }

  Login(username, password) {
    this.getUsernameField().type(username);
    this.getPasswordField().type(password);
  }

  login(username, password) {
    this.getUsernameField().type(username);
    this.getPasswordField().type(password);
    this.getSubmitButton().click();
  }
}

export default LoginPage;
