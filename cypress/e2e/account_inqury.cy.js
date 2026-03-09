const { buildAccountInquiryPayload } = require('../support/req_payload/account_inquiry_payload');

describe("SOAP API Account Inquiry - Response Validation", () => {
    it("Validate responseCode for multiple accounts", () => {
      
        cy.fixture("data/account_inquiry.json").then((accountsData) => {
            accountsData.rows.forEach((account) => {
                // Build dynamic SOAP body
                const soapBody = buildAccountInquiryPayload(account);
                cy.request({
                    method: "POST",
                    url: "http://172.21.23.11:7800/AccountServices", 
                    headers: {
                        "Content-Type": "text/xml; charset=utf-8",
                        "SOAPAction": "http://www.bankbii.com/AccountServices/AccountInquiry"
                    },
                    body: soapBody,
                    failOnStatusCode: false
                }).then((res) => {


                    if (res.body.includes("<html") || res.body.includes("Zscaler") || res.body.includes("login")) {
                        cy.log(`⚠️ Account ${account.accountNo} request skipped: possible SSO/login page`);
                        return; // skip tanpa throw
                    }

                    expect(res.status).to.eq(200);

                    // Parse XML response
                    cy.parseXML(res.body).then((xml) => {

                        // Ambil responseCode
                        const responseCode = xml['soapenv:Envelope']['soapenv:Body'][0]['ns2:AccountInquiryResponse'][0]['responseCode'][0];

                        if (responseCode === '00') {
                            cy.log(`Account ${account.accountNo} SUCCESS`);
                        } else {
                            throw new Error(`Account ${account.accountNo} FAILED, responseCode=${responseCode}`);
                        }

                    });
                });
            });
        });
    });
});