import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../e2e/page_objects/loginPage";

// Inisiasi Page Object
const loginPage = new LoginPage();

// Scenario 1: Login dengan kredensial yang valid
Given("Pengguna berada di halaman login", () => {
  loginPage.visit();
});

When(
  "Pengguna mengisi username {string} dan password {string}",
  (username, password) => {
    loginPage.Login(username, password);
  }
);

When("Pengguna mengklik tombol login", () => {
  loginPage.getSubmitButton().click();
});

Then("Pengguna akan masuk ke halaman dashboard", () => {
  cy.url().should("include", "/dashboard");
  cy.get(".oxd-userdropdown-name").should("contain", "Yukti Baheti"); // Ganti dengan nama pengguna yang sesuai
});

// Scenario 2-4: Login gagal dengan kombinasi username/password yang salah
Then("Pengguna melihat pesan error {string}", errorMessage => {
  loginPage.getErrorMessage().should("contain", errorMessage);
});

// Scenario 5: Login gagal dengan username dan password kosong
When(
  "Pengguna mengklik tombol login tanpa mengisi username dan password",
  () => {
    loginPage.getSubmitButton().click();
  }
);

Then(
  "Pengguna melihat pesan {string} di kolom username dan password",
  errorMessage => {
    cy
      .get('input[placeholder="Username"]')
      .should("have.css", "border-color", "rgb(235, 9, 16)"); // Warna merah di input username
    cy
      .get('input[placeholder="Password"]')
      .should("have.css", "border-color", "rgb(235, 9, 16)"); // Warna merah di input password
    cy
      .get(".oxd-input-group > .oxd-text")
      .eq(0)
      .should("contain", errorMessage); // Pesan di bawah input username
    cy
      .get(".oxd-input-group > .oxd-text")
      .eq(1)
      .should("contain", errorMessage); // Pesan di bawah input password
  }
);

// Scenario 6: Logout
Given(
  "Pengguna sudah login dengan username {string} dan password {string}",
  (username, password) => {
    loginPage.visit();
    loginPage.login(username, password);

    // Tunggu elemen spesifik pada dashboard sebelum lanjut ke logout
    cy.get(".oxd-userdropdown-name").should("be.visible"); // Pastikan elemen ini muncul di halaman dashboard
  }
);

When("Pengguna mengklik tombol logout", () => {
  // Klik dropdown untuk logout
  cy.get(".oxd-userdropdown-name").click();

  // Tunggu hingga opsi logout muncul dan klik logout
  cy.get("a.oxd-userdropdown-link").contains("Logout").click();
});

Then("Pengguna akan kembali ke halaman login", () => {
  // Verifikasi bahwa pengguna diarahkan kembali ke halaman login
  cy.url().should("include", "/auth/login");
});
