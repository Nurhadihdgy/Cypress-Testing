import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
// cypress/integration/step_definitions/forgotPasswordSteps.js
// cypress/integration/step_definitions/forgotPasswordSteps.js
import ForgotPasswordPage from "../../e2e/page_objects/forgotPasswordPage";

Given("Pengguna berada di halaman forgot password", () => {
  ForgotPasswordPage.visit();
});

When("Pengguna mengisi username {string}", username => {
  cy.interceptForgotPassword(username); // Mengaktifkan intercept berdasarkan username
  ForgotPasswordPage.fillUsername(username);
});

When("Pengguna mengklik tombol reset password", () => {
  ForgotPasswordPage.submit();
});

When("Pengguna mengklik tombol reset password tanpa mengisi username", () => {
  cy.interceptForgotPassword(""); // Mengaktifkan intercept untuk field kosong
  ForgotPasswordPage.submit();
});

Then("Pengguna melihat pesan sukses {string}", message => {
  ForgotPasswordPage.assertSuccessMessage(message);
});

Then("Pengguna melihat pesan error pada field username {string}", message => {
  ForgotPasswordPage.assertRequiredFieldMessage(message);
});
