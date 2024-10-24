import LoginPage from "../page_objects/loginPage";
import DashboardPage from "../page_objects/DashboardPage";

describe("OrangeHRM Login Test Suite with POM and Intercept", () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    cy
      .intercept({
        method: "POST",
        url: "/web/index.php/auth/validate" // Endpoint untuk login
      })
      .as("loginRequest"); // Alias untuk request
  });

  it("TC-001: Pengguna Dapat Login Ke Aplikasi", () => {
    loginPage.visit();

    // Input Username dan Password valid
    loginPage.login("Admin", "admin123");

    // Tunggu request login dan verifikasi responsnya
    cy.wait("@loginRequest").then(interception => {
      expect(interception.response.statusCode).to.eq(302); // Verifikasi status login berhasil
    });

    // Assertion: Verifikasi bahwa halaman dashboard berhasil dimuat
    cy.url().should("include", "/dashboard");
    dashboardPage.getUserDropdown().should("contain", "Sourav user");
  });

  it("TC-002: Pengguna Gagal Login Ke Aplikasi Dengan Username Salah", () => {
    loginPage.visit();

    // Input Username tidak valid dan Password
    loginPage.login("useradmin", "admin123");

    // Tunggu request login dan verifikasi responsnya
    cy.wait("@loginRequest").then(interception => {
      expect(interception.response.statusCode).to.eq(302); // Verifikasi bahwa login gagal
    });

    // Assertion: Verifikasi error message muncul
    cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
  });

  it("TC-003: Pengguna Gagal Login Dengan Password Salah", () => {
    loginPage.visit();

    // Input Username valid dan Password tidak valid
    loginPage.login("Admin", "wrongpassword");

    // Tunggu request login dan verifikasi responsnya
    cy.wait("@loginRequest").then(interception => {
      expect(interception.response.statusCode).to.eq(302); // Verifikasi bahwa login gagal
    });

    // Assertion: Verifikasi error message muncul
    cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
  });

  it("TC-004: Pengguna Gagal Login Dengan Username dan Password Yang Salah", () => {
    loginPage.visit();

    // Input Username dan Password tidak valid
    loginPage.login("useradmin", "wrongpassword");

    // Tunggu request login dan verifikasi responsnya
    cy.wait("@loginRequest").then(interception => {
      expect(interception.response.statusCode).to.eq(302); // Verifikasi bahwa login gagal
    });

    // Assertion: Verifikasi error message muncul
    cy.get(".oxd-alert-content").should("contain", "Invalid credentials");
  });

  it("TC-005: Pengguna Gagal Login Dengan Username dan Password Kosong", () => {
    loginPage.visit();

    // Biarkan kolom username dan password kosong, lalu klik login
    loginPage.getSubmitButton().click();

    // Assertion: Verifikasi bahwa tanda merah dan pesan "required" muncul
    cy
      .get('input[placeholder="Username"]')
      .should("have.css", "border-color", "rgb(235, 9, 16)");
    cy
      .get('input[placeholder="Password"]')
      .should("have.css", "border-color", "rgb(235, 9, 16)");
    cy.get(".oxd-input-group > .oxd-text").eq(0).should("contain", "Required");
    cy.get(".oxd-input-group > .oxd-text").eq(1).should("contain", "Required");
  });

  it("TC-006: Pengguna Berhasil Logout Dari Aplikasi", () => {
    loginPage.visit();

    // Login terlebih dahulu
    loginPage.login("Admin", "admin123");

    // Tunggu halaman dashboard selesai dimuat
    cy.wait("@loginRequest").then(interception => {
      expect(interception.response.statusCode).to.eq(302); // Verifikasi status login berhasil
    });

    cy.wait(2000);
    // Klik dropdown user dan logout
    dashboardPage.clickLogout();

    // Assertion: Verifikasi kembali ke halaman login
    cy.url().should("include", "/auth/login");
  });
});
