describe("DE Order Tests", () => {

  it("Creates a constituent", () => {
    cy.exec(
      `sfdx force:org:display -u $ORG_NAME --json | sed -r "s/[[:cntrl:]][[0-9]{1,3}m//g"`
    ).then((response) => {
      cy.log(JSON.stringify(response));
      let result = JSON.parse(response.stdout).result;
      let sessionId = result.accessToken;
      // let instanceUrl = result.instanceUrl;
      let instanceUrl = process.env.INSTANCE_URL;
      // Cypress.config(
      //   "baseUrl",
      //   `${instanceUrl.split(".")[0]}.lightning.force.com`
      // );
      cy.request(`${instanceUrl}/secur/frontdoor.jsp?sid=${sessionId}`);
      cy.visit(`${instanceUrl}/lightning/o/Contact/new`);      

      cy.get("records-lwc-detail-panel").then((el) => {
        cy.wait(3000);
        cy.document().then((doc) => {
          const inputNameFieldSet = doc.querySelector("records-lwc-detail-panel").shadowRoot
          .querySelector("records-base-record-form").shadowRoot
          .querySelector("records-record-layout-event-broker").shadowRoot
          .querySelector("slot").assignedElements()
          .map((el) => el.shadowRoot)[0]
          .children[0].shadowRoot
          .children[0].querySelector("slot")
          .children[0].shadowRoot
          .children[0].shadowRoot
          .querySelectorAll(".slds-form-element__row");

          inputNameFieldSet[1].children[0].shadowRoot
          .querySelector('input[name="firstName"]').value = "Johnny";

          inputNameFieldSet[3].children[0]
          .shadowRoot.querySelector('input[name="lastName"]').value = "Depp";

          const constituentTypeFieldSet = doc
            .querySelector("records-lwc-detail-panel")
            .shadowRoot.querySelector("records-base-record-form")
            .shadowRoot.querySelector("records-record-layout-event-broker")
            .shadowRoot.querySelector("slot")
            .assignedElements()
            .map((el) => el.shadowRoot)[0]
            .children[0].shadowRoot.children[0].shadowRoot.querySelector("slot")
            .assignedElements()[1]
            .shadowRoot.querySelector("slot")
            .assignedElements()[0]
            .children[0].shadowRoot.querySelector("slot")
            .assignedElements()[0].children[0].shadowRoot.children[0].shadowRoot
            .children[0].shadowRoot.children[0];

          constituentTypeFieldSet.scrollIntoView();
          constituentTypeFieldSet.shadowRoot.querySelector('span[title="Student"]').click();
          constituentTypeFieldSet.shadowRoot
            .querySelector("lightning-button-icon")
            .shadowRoot.querySelector('button')
            .click();

          cy.wait(3000);

          doc.querySelector("records-lwc-detail-panel")
            .shadowRoot.querySelector("records-base-record-form")
            .shadowRoot.querySelector("force-form-footer")
            .shadowRoot.querySelector("runtime_platform_actions-actions-ribbon")
            .shadowRoot.querySelectorAll(
              "runtime_platform_actions-action-renderer"
            )[2]
            .shadowRoot.querySelector(
              "runtime_platform_actions-headless-action-render"
            )
            .children[0].children[0].shadowRoot.querySelector(
              'button[name="SaveEdit"]'
            )
            .click();
          
          cy.wait(3000);

          cy.contains('Johnny Depp');
        });
      });
    });
  });
});