/// <reference types="cypress" />

describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  context("GET Todos", () => {
    it("Receives Todos", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:7000/todos",
      }).should((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it("Input New Todos", () => {
    cy.get(".input__box").type("Troll Raymond");
    cy.get(".input__submit").click();
    cy.get(".todos__single--text").contains("Troll Raymond").should("exist");
  });

  it("Change todo to Done = true", () => {
    cy.get(":nth-child(6) > div > :nth-child(2)").click();
  });

  it("Checks isDone", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:7000/todos",
    }).should((response) => {
      expect(response.body[5].isDone).to.be.equal(true);
    });
  });

  it("Delete Existing Todo", () => {
    cy.get(":nth-child(6) > div > :nth-child(1)").click();
    cy.get(".todos__single--text")
      .contains("Troll Raymond")
      .should("not.exist");
  });
});
