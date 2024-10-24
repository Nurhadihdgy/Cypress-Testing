describe("API Testing Login", () => {
  const apiUrl =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate";

  it("TC-001: Login berhasil dengan kredensial yang valid", () => {
    cy
      .request({
        method: "POST",
        url: apiUrl, // URL login API
        body: {
          username: "Admin",
          password: "admin123"
        }
      })
      .then(response => {
        // Verifikasi bahwa status respons adalah 200 (sukses)
        expect(response.status).to.eq(302);

        // Verifikasi body respons (tergantung struktur yang dikembalikan API)
        expect(response.body).to.have.property("success", true);
        expect(response.body).to.have.property(
          "message",
          "Successfully Logged In"
        );
      });
  });

  it("TC-002: Login gagal dengan kredensial yang salah", () => {
    cy
      .request({
        method: "POST",
        url: apiUrl, // URL login API
        failOnStatusCode: false, // Mengizinkan respons gagal (status bukan 2xx)
        body: {
          username: "InvalidUser",
          password: "invalidPass"
        }
      })
      .then(response => {
        // Verifikasi bahwa status respons adalah 401 (Unauthorized)
        expect(response.status).to.eq(401);

        // Verifikasi body respons untuk login gagal
        expect(response.body).to.have.property("success", false);
        expect(response.body).to.have.property(
          "message",
          "Invalid Credentials"
        );
      });
  });
});
