describe("Pengujian API ReqRes dengan Cypress", () => {
  // Data untuk pengujian List Users
  const usersData = [
    { page: 1, expectedUsers: 6 },
    { page: 2, expectedUsers: 6 }
  ];

  // Data untuk pengujian Single User (parameterisasi)
  const userIds = [1, 2, 3, 4];

  // Data untuk pengujian Single User Not Found
  const invalidUserIds = [23, 24];

  // Data untuk pengujian List Resources (parameterisasi)
  const resourcesData = [{ id: 1 }, { id: 2 }, { id: 3 }];

  // Data untuk pengujian Single Resource Not Found
  const invalidResourceIds = [100, 101];

  // Data untuk pengujian Create User
  const createUserTestData = [
    { name: "morpheus", job: "leader", expectedStatus: 201 },
    { name: "neo", job: "the one", expectedStatus: 201 }
  ];

  // Data untuk pengujian Login (sukses dan gagal)
  const loginData = [
    { email: "eve.holt@reqres.in", password: "cityslicka", success: true },
    { email: "peter@klaven", password: "", success: false }
  ];

  // Pengujian List Users menggunakan Data-Driven Testing
  usersData.forEach(test => {
    it(`GET list users untuk halaman ${test.page}`, () => {
      cy
        .request("GET", `https://reqres.in/api/users?page=${test.page}`)
        .then(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("data");
          expect(response.body.data.length).to.eq(test.expectedUsers);
        });
    });
  });

  // Pengujian Single User dengan Parameterisasi
  userIds.forEach(id => {
    it(`GET single user dengan ID ${id}`, () => {
      cy.request("GET", `https://reqres.in/api/users/${id}`).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property("id", id);
      });
    });
  });

  // Pengujian Single User Not Found dengan Parameterisasi
  invalidUserIds.forEach(id => {
    it(`GET single user dengan ID ${id} tidak ditemukan`, () => {
      cy
        .request({
          method: "GET",
          url: `https://reqres.in/api/users/${id}`,
          failOnStatusCode: false
        })
        .then(response => {
          expect(response.status).to.eq(404);
        });
    });
  });

  // Pengujian List <resource>
  it("GET list resources", () => {
    cy.request("GET", "https://reqres.in/api/unknown").then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });

  // Pengujian Single <resource> dengan Parameterisasi
  resourcesData.forEach(resource => {
    it(`GET single resource dengan ID ${resource.id}`, () => {
      cy
        .request("GET", `https://reqres.in/api/unknown/${resource.id}`)
        .then(response => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.have.property("id", resource.id);
        });
    });
  });

  // Pengujian Single <resource> Not Found dengan Parameterisasi
  invalidResourceIds.forEach(id => {
    it(`GET single resource dengan ID ${id} tidak ditemukan`, () => {
      cy
        .request({
          method: "GET",
          url: `https://reqres.in/api/unknown/${id}`,
          failOnStatusCode: false
        })
        .then(response => {
          expect(response.status).to.eq(404);
        });
    });
  });

  // Pengujian Create User menggunakan Data-Driven Testing
  createUserTestData.forEach(user => {
    it(`POST create user dengan nama ${user.name}`, () => {
      cy
        .request("POST", "https://reqres.in/api/users", {
          name: user.name,
          job: user.job
        })
        .then(response => {
          expect(response.status).to.eq(user.expectedStatus);
          expect(response.body).to.have.property("name", user.name);
          expect(response.body).to.have.property("job", user.job);
        });
    });
  });

  // Pengujian Update User dengan Parameterisasi
  userIds.forEach(id => {
    it(`PUT update user dengan ID ${id}`, () => {
      cy
        .request("PUT", `https://reqres.in/api/users/${id}`, {
          name: "updatedUser",
          job: "updatedJob"
        })
        .then(response => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("name", "updatedUser");
          expect(response.body).to.have.property("job", "updatedJob");
        });
    });
  });

  // Pengujian Delete User dengan Parameterisasi
  userIds.forEach(id => {
    it(`DELETE user dengan ID ${id}`, () => {
      cy
        .request("DELETE", `https://reqres.in/api/users/${id}`)
        .then(response => {
          expect(response.status).to.eq(204);
        });
    });
  });

  // Pengujian Login dengan Data-Driven Testing
  loginData.forEach(data => {
    it(`POST login dengan email ${data.email}`, () => {
      cy
        .request({
          method: "POST",
          url: "https://reqres.in/api/login",
          failOnStatusCode: false,
          body: {
            email: data.email,
            password: data.password
          }
        })
        .then(response => {
          if (data.success) {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("token");
          } else {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property("error", "Missing password");
          }
        });
    });
  });

  // Pengujian Delayed Response untuk List Users
  it("GET delayed response untuk list users", () => {
    cy.request("GET", "https://reqres.in/api/users?delay=3").then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });

  // Pengujian Delayed Response untuk List Resources
  it("GET delayed response untuk list resources", () => {
    cy
      .request("GET", "https://reqres.in/api/unknown?delay=3")
      .then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
      });
  });
});
