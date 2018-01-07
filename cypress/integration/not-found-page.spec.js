describe('Not Found Page', () => {
  beforeEach(() => {
    const badPath = 'foobar'
    cy.visit(`http://localhost:3000/${badPath}`)
  })

  it('displays when incorrect url is entered', () => {
    cy.get('.not-found-page')
  })
})
