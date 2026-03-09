// cypress/req_payload/account_inquiry_payload.js

// Fungsi JS biasa, bukan Cypress command
function buildAccountInquiryPayload(account) {
  const uuid = () => Cypress._.uniqueId('msg-');
  const date = new Date();
  const transactionDate = `${("0"+date.getDate()).slice(-2)}-${("0"+(date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`;
  const transactionTime = `${("0"+date.getHours()).slice(-2)}:${("0"+date.getMinutes()).slice(-2)}:${("0"+date.getSeconds()).slice(-2)}`;

  return `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:acc="http://www.bankbii.com/AccountServices/">
  <soapenv:Header/>
  <soapenv:Body>
    <acc:AccountInquiry>
      <ChannelHeader>
        <messageID>${uuid()}</messageID>
        <additionalHeader/>
        <branchCode>270</branchCode>
        <channelID>M2U</channelID>
        <clientSupervisorID>0000</clientSupervisorID>
        <clientUserID>0000</clientUserID>
        <reference>5BC153CC-6986-4D2C-8104-11F8A8A44E85</reference>
        <sequenceno>4358</sequenceno>
        <transactiondate>${transactionDate}</transactiondate>
        <transactiontime>${transactionTime}</transactiontime>
      </ChannelHeader>
      <AccountInquiryRequest>
        <accountNo>${account.accountNo}</accountNo>
        <accountBranchCode>${account.accountBranchCode}</accountBranchCode>
        <accountCurrency>${account.accountCurrency}</accountCurrency>
      </AccountInquiryRequest>
    </acc:AccountInquiry>
  </soapenv:Body>
</soapenv:Envelope>`;
}

module.exports = { buildAccountInquiryPayload };