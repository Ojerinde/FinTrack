/// <reference types="cypress" />

describe("Wallet Ledger Dashboard", () => {
  beforeEach(() => {
    cy.visit("/dashboard");
    cy.viewport(1280, 720);
  });

  describe("Header Component", () => {
    it("should display the FinTrack logo and user avatar", () => {
      cy.get("header").within(() => {
        cy.get('img[alt="FinTrack Logo"]').should("be.visible");
        cy.get('img[alt="User Avatar"]').should("be.visible");
      });
    });

    it("should toggle the search input when clicking the search icon", () => {
      cy.get('input[aria-label="Search input"]').should("not.exist");
      cy.get("header").find('svg[aria-label="Toggle search"]').click();
      cy.get('input[aria-label="Search input"]').should("be.visible");
      cy.get("header").find('svg[aria-label="Toggle search"]').click();
      cy.get('input[aria-label="Search input"]').should("not.exist");
    });

    it("should display the grid icon", () => {
      cy.get("header").find('svg[aria-label="View grid"]').should("be.visible");
    });

    it("should be accessible", () => {
      cy.get("header").should("have.attr", "role", "banner");
      cy.get("header")
        .find('svg[aria-label="Close sidebar"]')
        .should("have.attr", "aria-expanded", "true");
    });
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

    it("should collapse to icons only when closed", () => {
      cy.get("header").find('svg[aria-label="Close sidebar"]').click();
      cy.get("aside").within(() => {
        cy.get("a").contains("Dashboard").should("not.exist");
        cy.get('div[aria-hidden="true"]').should("have.length", 4);
      });
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

  describe("UserAvatars Component", () => {
    it("should display user avatars and the correct text", () => {
      cy.get('section[aria-label="User avatars"]').within(() => {
        cy.get("img").should("have.length", 4);
        // Update text based on mockUsers data; assuming first three names are displayed
        cy.get("span")
          .invoke("text")
          .should("match", /.*,.*,.*,\s*\+\d+\s*others/);
      });
    });

    it("should be responsive on mobile", () => {
      cy.viewport("iphone-xr");
      cy.get('section[aria-label="User avatars"]').should(
        "have.class",
        "max-sm:flex-col"
      );
      cy.get('section[aria-label="User avatars"]')
        .find("img")
        .should("have.length", 4);
    });

    it("should be accessible", () => {
      cy.get('section[aria-label="User avatars"]').should(
        "have.attr",
        "role",
        "region"
      );
      cy.get('section[aria-label="User avatars"]')
        .find('div[role="list"]')
        .should("exist");
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

  describe("SummaryCards Component", () => {
    it("should display all summary cards with correct data", () => {
      cy.get('section[aria-label="Dashboard summary cards"]').within(() => {
        cy.get("article").should("have.length", 4);
        cy.get("article").contains("Total Balance").parent().should("exist");
        cy.get("article").contains("Total Credits").parent().should("exist");
        cy.get("article").contains("Total Debits").parent().should("exist");
        cy.get("article").contains("Transactions").parent().should("exist");
      });
    });

    it("should display correct change percentages with colors", () => {
      cy.get('section[aria-label="Dashboard summary cards"]').within(() => {
        cy.get("article").each(($el) => {
          cy.wrap($el)
            .find('div[role="text"]')
            .last()
            .invoke("text")
            .should("match", /[+-]?\d+%/);
          cy.wrap($el)
            .find('div[role="text"]')
            .last()
            .should("satisfy", ($div) => {
              const text = $div.text();
              const isIncrease = text.includes("+");
              return $div.hasClass(
                isIncrease ? "text-primary-light" : "text-error-color"
              );
            });
        });
      });
    });

    it("should be responsive on mobile", () => {
      cy.viewport("iphone-xr");
      cy.get('section[aria-label="Dashboard summary cards"]').should(
        "have.class",
        "flex-col"
      );
      cy.get('section[aria-label="Dashboard summary cards"]')
        .find("article")
        .should("have.length", 4);
    });

    it("should be accessible", () => {
      cy.get('section[aria-label="Dashboard summary cards"]').should(
        "have.attr",
        "role",
        "region"
      );
      cy.get('section[aria-label="Dashboard summary cards"]')
        .find("article")
        .each(($el) => {
          cy.wrap($el).should("have.attr", "role", "article");
        });
    });
  });

  describe("TransactionTable Component", () => {
    beforeEach(() => {
      cy.get('nav[aria-label="Dashboard tabs"]')
        .find("button")
        .contains("Transactions")
        .click();
    });

    it("should display the transaction table with correct columns", () => {
      cy.get('div[aria-label="Transaction table"]').within(() => {
        cy.get("th").contains("Date").should("be.visible");
        cy.get("th").contains("Remark").should("be.visible");
        cy.get("th").contains("Amount").should("be.visible");
        cy.get("th").contains("Currency").should("be.visible");
        cy.get("th").contains("Type").should("be.visible");
      });
    });

    it("should display transaction data correctly", () => {
      cy.get('div[aria-label="Transaction table"]').within(() => {
        cy.get("tbody tr").should("have.length.gte", 1);
        cy.get("tbody tr")
          .first()
          .within(() => {
            cy.get("td")
              .eq(0)
              .invoke("text")
              .should("match", /\d{4}-\d{2}-\d{2}/);
            cy.get("td").eq(1).should("not.be.empty");
            cy.get("td")
              .eq(2)
              .invoke("text")
              .should("match", /[+-]?\$[\d,]+\.?\d*/);
            cy.get("td").eq(3).should("not.be.empty");
          });
      });
    });

    it("should sort the table by Date", () => {
      cy.get('div[aria-label="Transaction table"]').within(() => {
        cy.get("th").contains("Date").click();
        cy.get("tbody tr")
          .first()
          .find("td")
          .eq(0)
          .invoke("text")
          .then((firstDate) => {
            cy.get("th").contains("Date").click();
            cy.get("tbody tr")
              .first()
              .find("td")
              .eq(0)
              .invoke("text")
              .should("not.eq", firstDate);
          });
      });
    });

    it("should handle pagination", () => {
      cy.get('div[aria-label="Transaction table"]').within(() => {
        cy.get("tbody tr").should("have.length.gte", 1);
        cy.contains("Next").click();
        cy.get("tbody tr").should("have.length.gte", 1);
        cy.contains("Previous").click();
        cy.get("tbody tr").should("have.length.gte", 1);
      });
    });

    it("should handle empty data state", () => {
      cy.intercept("GET", "/api/transactions", { body: [] }).as(
        "getTransactions"
      );
      cy.reload();
      cy.get('div[aria-label="Transaction table"]')
        .contains("No data available at the moment")
        .should("be.visible");
    });

    it("should be responsive on mobile", () => {
      cy.viewport("iphone-xr");
      cy.get('div[aria-label="Transaction table"]').should("be.visible");
      cy.get('div[aria-label="Transaction table"]')
        .find(".sm\\:hidden")
        .find("div")
        .should("have.length.gte", 1);
    });

    it("should be accessible", () => {
      cy.get('div[aria-label="Transaction table"]').should(
        "have.attr",
        "role",
        "region"
      );
      cy.get('div[aria-label="Transaction table"]')
        .find("th")
        .each(($el) => {
          cy.wrap($el).should("have.attr", "scope", "col");
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
