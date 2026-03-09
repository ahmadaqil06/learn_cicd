const xml2js = require('cypress')

describe('API XML Testing', () => {

  it('Validate XML response', () => {

    cy.request({
      method: 'GET',
      url: 'https://www.w3schools.com/xml/note.xml',
      body: ''
    }).then((response) => {

      expect(response.status).to.eq(200)

      xml2js.parseString(response.body, (err, result) => {

        expect(result.note.to[0]).to.eq('Tove')
        expect(result.note.from[0]).to.eq('Jani')

      })

    })

  })

})