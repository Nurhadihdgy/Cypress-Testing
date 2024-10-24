class DashboardPage {
  getUserDropdown() {
    return cy.get(".oxd-userdropdown-name");
  }

  clickLogout() {
    cy.get(".oxd-userdropdown-name").click();
    cy.get("a.oxd-userdropdown-link").contains("Logout").click();
  }
}

export default DashboardPage;
