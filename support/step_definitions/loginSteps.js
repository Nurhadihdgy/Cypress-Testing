import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../e2e/page_objects/loginPage";

Given("Pengguna berada di halaman login", () => {
  LoginPage.visit();
});

Given(
  "Pengguna mengisi username {string} dan password {string}",
  (username, password) => {
    // Menetapkan intercept berdasarkan username dan password yang dimasukkan
    cy.interceptLogin(username, password);
    LoginPage.fillUsername(username);
    LoginPage.fillPassword(password);
  }
);

Given("Pengguna mengklik tombol login", () => {
  LoginPage.submit();
});

Then("Pengguna akan masuk ke halaman dashboard", () => {
  LoginPage.assertLoginSuccess();
});

Then("Pengguna melihat pesan error {string}", errorMessage => {
  cy.get(".oxd-alert-content").should("contain", errorMessage);
});

Given(
  "Pengguna mengklik tombol login tanpa mengisi username dan password",
  () => {
    LoginPage.submit();
  }
);

Then(
  "Pengguna melihat pesan {string} di kolom username dan password",
  message => {
    cy
      .get('input[placeholder="Username"]')
      .should("have.css", "border-color", "rgb(235, 9, 16)"); // Warna merah di input username
    cy
      .get('input[placeholder="Password"]')
      .should("have.css", "border-color", "rgb(235, 9, 16)"); // Warna merah di input password
    cy.get(".oxd-input-group > .oxd-text").eq(0).should("contain", message); // Pesan di bawah input username
    cy.get(".oxd-input-group > .oxd-text").eq(1).should("contain", message); // Pesan di bawah input password
  }
);
