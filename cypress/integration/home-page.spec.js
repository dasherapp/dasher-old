describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('redirects to login page when user is logged out', () => {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/login')
    })
  })
})
