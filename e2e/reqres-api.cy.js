describe("API Testing ReqRes", () => {
  // List Users
  it("GET list users", () => {
    cy.request("GET", "https://reqres.in/api/users?page=2").then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.have.length(6); // assumed 6 users per page
    });
  });

  // Single User
  it("GET single user", () => {
    cy.request("GET", "https://reqres.in/api/users/2").then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("id", 2);
    });
  });

  // Single User Not Found
  it("GET single user not found", () => {
    cy
      .request({
        method: "GET",
        url: "https://reqres.in/api/users/23",
        failOnStatusCode: false
      })
      .then(response => {
        expect(response.status).to.eq(404);
      });
  });

  // List <resource>
  it("GET list resources", () => {
    cy.request("GET", "https://reqres.in/api/unknown").then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });

  // Single <resource>
  it("GET single resource", () => {
    cy.request("GET", "https://reqres.in/api/unknown/2").then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("id", 2);
    });
  });

  // Single <resource> Not Found
  it("GET single resource not found", () => {
    cy
      .request({
        method: "GET",
        url: "https://reqres.in/api/unknown/23",
        failOnStatusCode: false
      })
      .then(response => {
        expect(response.status).to.eq(404);
      });
  });

  // Create User
  it("POST create user", () => {
    cy
      .request("POST", "https://reqres.in/api/users", {
        name: "morpheus",
        job: "leader"
      })
      .then(response => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("name", "morpheus");
        expect(response.body).to.have.property("job", "leader");
      });
  });

  // Update User (PUT)
  it("PUT update user", () => {
    cy
      .request("PUT", "https://reqres.in/api/users/2", {
        name: "morpheus",
        job: "zion resident"
      })
      .then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("name", "morpheus");
        expect(response.body).to.have.property("job", "zion resident");
      });
  });

  // Update User (PATCH)
  it("PATCH update user", () => {
    cy
      .request("PATCH", "https://reqres.in/api/users/2", {
        name: "neo",
        job: "the one"
      })
      .then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("name", "neo");
        expect(response.body).to.have.property("job", "the one");
      });
  });

  // Delete User
  it("DELETE user", () => {
    cy.request("DELETE", "https://reqres.in/api/users/2").then(response => {
      expect(response.status).to.eq(204);
    });
  });

  // Register - Successful
  it("POST successful register", () => {
    cy
      .request("POST", "https://reqres.in/api/register", {
        email: "eve.holt@reqres.in",
        password: "pistol"
      })
      .then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
      });
  });

  // Register - Unsuccessful
  it("POST unsuccessful register", () => {
    cy
      .request({
        method: "POST",
        url: "https://reqres.in/api/register",
        failOnStatusCode: false,
        body: {
          email: "sydney@fife"
        }
      })
      .then(response => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error", "Missing password");
      });
  });

  // Login - Successful
  it("POST successful login", () => {
    cy
      .request("POST", "https://reqres.in/api/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      })
      .then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
      });
  });

  // Login - Unsuccessful
  it("POST unsuccessful login", () => {
    cy
      .request({
        method: "POST",
        url: "https://reqres.in/api/login",
        failOnStatusCode: false,
        body: {
          email: "peter@klaven"
        }
      })
      .then(response => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error", "Missing password");
      });
  });

  // Delayed Response for List Users
  it("GET delayed response for list users", () => {
    cy.request("GET", "https://reqres.in/api/users?delay=3").then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });
});
