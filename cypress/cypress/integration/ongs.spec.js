/// <reference types="cypress"/>

describe("Login no sistema", () => {
  it.skip("login", () => {
    //cy.visit para visitar uma pagina
    cy.visit("http://localhost:3000/register");
    //cy.get - busca um elemento
    //type- insere um texto
    cy.get("[data-cy=name]").type("lalala");
    cy.get('[data-cy="email"]').type("email@emai.com");
    cy.get('[data-cy="whatsapp"]').type("889999999");
    cy.get('[data-cy="city"]').type("City");
    cy.get('[data-cy="uf"]').type("CE");

    //routing
    //start server com cy.server()
    //atribuir rota a uma alias
    // esperar com cy.wait e fazer validação
    // cy.server();
    cy.route("POST", "**/ongs").as("postOng");
    cy.get('[data-cy="submit"]').click();
    cy.wait("@postOng").then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  });
  it("deve poder fazer login no sistema", () => {
    cy.visit("http://localhost:3000/");
    cy.get("input").type(Cypress.env("createdOngId"));
    cy.get(".button").click();
  });
});
