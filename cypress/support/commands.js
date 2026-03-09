const xml2js = require('xml2js');

// parse XML response
Cypress.Commands.add("parseXML", (xml) => {
  return xml2js.parseStringPromise(xml, { explicitArray: true });
});

