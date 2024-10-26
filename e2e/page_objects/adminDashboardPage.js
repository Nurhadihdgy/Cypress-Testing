// cypress/pages/AdminDashboardPage.js

class AdminDashboardPage {
  // visit() {
  //   cy.visit(
  //     "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  //   );
  // }

  // enterUsername(username) {
  //   cy.get(".oxd-input.oxd-input--active").first().type(username);
  // }

  // enterPassword(password) {
  //   cy.get(".oxd-input.oxd-input--active").last().type(password);
  // }

  // clickLoginButton() {
  //   cy
  //     .get(
  //       ".oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button"
  //     )
  //     .click();
  // }
  navigateToAdmin() {
    cy.get(".oxd-main-menu-item-wrapper").contains("Admin").click();
  }

  clickAddButton() {
    cy
      .get(".oxd-button.oxd-button--medium.oxd-button--secondary")
      .contains("Add")
      .click();
  }
  selectUserRole(role) {
    cy.get(".oxd-select-text").first().click();
    cy.get(".oxd-select-option").contains(role).click();
  }

  enterEmployeeName(employeeName) {
    // Ketik nama karyawan
    cy.get(".oxd-autocomplete-text-input > input").type(employeeName);

    // Tunggu hingga opsi autocomplete muncul
    cy.get(".oxd-autocomplete-option").should("exist");

    // Klik pada opsi autocomplete pertama yang ditemukan
    cy.get(".oxd-autocomplete-option > span").first().click({ force: true });
  }

  enterUsername(username) {
    cy.get(".oxd-input.oxd-input--active").eq(1).type(username);
  }

  selectStatus(status) {
    cy.get(".oxd-select-text").last().click();
    cy.get(".oxd-select-option").contains(status).click();
  }

  enterPassword(password) {
    cy.get("input[type='password']").eq(0).type(password, { log: true });
  }

  enterConfirmPassword(confirmPassword) {
    cy.get("input[type='password']").eq(1).type(confirmPassword, { log: true });
  }

  clickSaveButton() {
    cy
      .get(".oxd-button.oxd-button--medium.oxd-button--secondary")
      .contains("Save")
      .click();
  }
}

export default new AdminDashboardPage();
