/// <reference types="cypress" />

describe("Wallet Ledger Dashboard", () => {
  beforeEach(() => {
    cy.visit("/dashboard");
    cy.viewport(1280, 720);
  });

  describe("Sidebar Component", () => {
    it("should display all menu items when open", () => {
      cy.get("aside").within(() => {
        cy.get("li").should("have.length", 4);
        cy.get("a").contains("Dashboard").should("be.visible");
        cy.get("a").contains("Transactions").should("be.visible");
        cy.get("a").contains("Reports").should("be.visible");
        cy.get("a").contains("Settings").should("be.visible");
      });
    });

    it("should highlight the active menu item", () => {
      cy.get("aside")
        .find("a")
        .contains("Dashboard")
        .parent()
        .should("have.class", "bg-sidebar-active");
    });

    it("should navigate to the correct page when clicking a menu item", () => {
      cy.get("aside").find("a").contains("Transactions").click();
      cy.url().should("include", "/transactions");
    });

    it("should be accessible", () => {
      cy.get("aside").should("have.attr", "role", "navigation");
      cy.get("aside")
        .find("li")
        .each(($el) => {
          cy.wrap($el).should("have.attr", "role", "menuitem");
        });
    });
  });

  describe("TabNavigation Component", () => {
    it("should display Overview and Transactions tabs", () => {
      cy.get('nav[aria-label="Dashboard tabs"]').within(() => {
        cy.get("button").contains("Overview").should("be.visible");
        cy.get("button").contains("Transactions").should("be.visible");
      });
    });

    it("should highlight the active tab", () => {
      cy.get('nav[aria-label="Dashboard tabs"]').within(() => {
        cy.get("button")
          .contains("Overview")
          .should("have.class", "text-primary-accent");
        cy.get("button")
          .contains("Overview")
          .find("div")
          .should("have.class", "border-button-bg");
      });
    });

    it("should switch tabs when clicked", () => {
      cy.get('nav[aria-label="Dashboard tabs"]')
        .find("button")
        .contains("Transactions")
        .click();
      cy.get('div[aria-label="Transaction table"]').should("be.visible");
      cy.get('nav[aria-label="Dashboard tabs"]')
        .find("button")
        .contains("Transactions")
        .should("have.class", "text-primary-accent");
    });

    it("should be accessible", () => {
      cy.get('nav[aria-label="Dashboard tabs"]').should(
        "have.attr",
        "role",
        "tablist"
      );
      cy.get('nav[aria-label="Dashboard tabs"]')
        .find("button")
        .each(($el) => {
          cy.wrap($el).should("have.attr", "role", "tab");
        });
    });
  });

  describe("Responsiveness", () => {
    it("should render correctly on mobile (iPhone XR)", () => {
      cy.viewport("iphone-xr");
      cy.get("header").should("be.visible");
      cy.get("nav.lg\\:hidden").should("be.visible");
      cy.get('section[aria-label="User avatars"]').should("be.visible");
      cy.get('section[aria-label="Dashboard summary cards"]')
        .find("article")
        .should("have.length", 4);
      cy.get('nav[aria-label="Dashboard tabs"]').should("be.visible");
      cy.get('nav[aria-label="Dashboard tabs"]')
        .find("button")
        .contains("Transactions")
        .click();
      cy.get('div[aria-label="Transaction table"]').should("be.visible");
    });

    it("should render correctly on tablet (iPad)", () => {
      cy.viewport("ipad-2");
      cy.get("header").should("be.visible");
      cy.get("aside").should("have.class", "w-64");
      cy.get('section[aria-label="User avatars"]').should("be.visible");
      cy.get('section[aria-label="Dashboard summary cards"]')
        .find("article")
        .should("have.length", 4);
      cy.get('nav[aria-label="Dashboard tabs"]').should("be.visible");
      cy.get('nav[aria-label="Dashboard tabs"]')
        .find("button")
        .contains("Transactions")
        .click();
      cy.get('div[aria-label="Transaction table"]').should("be.visible");
    });
  });
});
