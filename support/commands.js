// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
// cypress/support/commands.js
Cypress.Commands.add("interceptLogin", () => {
  cy.intercept("POST", "**/auth/login", req => {
    req.reply(res => {
      res.send({
        statusCode: 200,
        body: {
          // Simulasi response login yang sukses
          message: "Login successful"
        }
      });
    });
  });
});
//

// cypress/support/commands.js
// cypress/support/commands.js
// cypress/support/commands.js
Cypress.Commands.add("interceptForgotPassword", username => {
  if (username === "Admin") {
    cy.intercept("POST", "**/auth/requestPasswordResetCode", {
      statusCode: 200,
      body: {
        message: "Reset Password link sent successfully"
      }
    });
  } else if (username === "invalidUser") {
    // Simulasikan respons "Username not found"
    cy.intercept("POST", "**/auth/requestPasswordResetCode", {
      statusCode: 404,
      body: {
        message: "Username not found"
      }
    });
  } else {
    cy.intercept("POST", "**/auth/requestPasswordResetCode", {
      statusCode: 400,
      body: {
        message: "Required"
      }
    });
  }
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
