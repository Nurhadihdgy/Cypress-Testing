import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../e2e/page_objects/loginPage";
import AdminDashboardPage from "../../e2e/page_objects/adminDashboardPage";

Given("I am logged in as an admin", () => {
  LoginPage.visit();
  LoginPage.fillUsername("Admin");
  LoginPage.fillPassword("admin123");
  LoginPage.submit();
});

When("I navigate to the Admin Dashboard", () => {
  AdminDashboardPage.navigateToAdmin();
});

When("I add a new user with the following details:", dataTable => {
  const data = dataTable.raw();
  const headers = data[0];
  const values = data[1];

  const userDetails = {};
  headers.forEach((header, index) => {
    userDetails[header.trim()] = values[index].trim();
  });

  AdminDashboardPage.clickAddButton();
  AdminDashboardPage.selectUserRole("Admin");
  AdminDashboardPage.enterEmployeeName(userDetails["Employee Name"]);
  AdminDashboardPage.enterUsername(userDetails["Username"]);
  AdminDashboardPage.selectStatus(userDetails["Status"]);
  AdminDashboardPage.enterPassword(userDetails["Password"]);
  AdminDashboardPage.enterConfirmPassword(userDetails["Password"]);
  AdminDashboardPage.clickSaveButton();
});

Then("I should see the user added successfully", () => {
  cy.intercept("POST", "**/api/v2/admin/users").as("addUserRequest");
  cy.wait("@addUserRequest").then(interception => {
    expect(interception.response.statusCode).to.equal(200);
    cy.get(".oxd-toast-container").should("contain", "Successfully Saved");
  });
});

When("I delete the user with username {string}", username => {
  // Intercept request untuk menghapus pengguna
  cy.intercept("DELETE", "**/api/v2/admin/users").as("deleteUserRequest");

  // Menggunakan first() untuk memilih input pertama yang ditemukan
  cy.get(".oxd-input.oxd-input--active").first().type(username);

  // Atau, jika Anda tahu bahwa input yang tepat berada di indeks tertentu
  cy.get(".oxd-input.oxd-input--active").eq(0).type(username); // Ubah indeks sesuai kebutuhan

  cy.get("button[type='submit']").click();
  cy.wait(2000);
  // Klik tombol hapus
  cy.xpath("//i[@class='oxd-icon bi-trash']").click();

  // Konfirmasi penghapusan
  cy.get(".oxd-button--label-danger").click(); // Sesuaikan selector konfirmasi
});

Then("I should see the user deleted successfully", () => {
  cy.wait("@deleteUserRequest").then(interception => {
    expect(interception.response.statusCode).to.equal(200);
    cy.get(".oxd-toast-container").should("contain", "Successfully Deleted");
  });
});
