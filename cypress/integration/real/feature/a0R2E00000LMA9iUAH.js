describe("DE Order Tests", () => {
  beforeEach(() => {
    cy.exec(
      `sfdx force:org:display -u "feature/a0R2E00000LMA9iUAH" --json | sed -r "s/[[:cntrl:]][[0-9]{1,3}m//g"`
    ).then((response) => {
      let result = JSON.parse(response.stdout).result;
      let sessionId = result.accessToken;
      let instanceUrl = result.instanceUrl;

      Cypress.config(
        "baseUrl",
        `${instanceUrl.split(".")[0]}.lightning.force.com`
      );

      cy.request(`${instanceUrl}/secur/frontdoor.jsp?sid=${sessionId}`);
      cy.visit(`${instanceUrl}/lightning/page/home`);
    });
  });

  it("Creates a DE Order", () => {
    cy.visit("/lightning/o/DE_Order__c/list");
    cy.contains("DE Order Name");

    cy.get('a[title="New"]').click();
    cy.get('input[data-interactive-lib-uid="5"]').type("Order One");
    cy.get('button[title="Save"]').click({ force: true });

    cy.visit("/lightning/o/DE_Order__c/list");
    cy.contains("Order One");
  });
});
