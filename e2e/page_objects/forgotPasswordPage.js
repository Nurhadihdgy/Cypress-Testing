// cypress/pages/forgotPasswordPage.js
class ForgotPasswordPage {
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    return cy.get(".orangehrm-login-forgot-header").click();
  }

  fillUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }

  assertSuccessMessage(message) {
    cy.get(".orangehrm-forgot-password-title").should("contain", message);
  }

  assertErrorMessage(message) {
    cy.get(".oxd-alert-content").should("contain", message);
  }

  assertRequiredFieldMessage(message) {
    cy.get(".oxd-input-field-error-message").should("contain", message);
  }
}

export default new ForgotPasswordPage();
