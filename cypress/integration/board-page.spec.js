describe('Board Page', () => {
  beforeEach(() => {
    const boardId = 78
    cy.visit(`http://localhost:3000/board/${boardId}`)
  })
  it('redirects to login page when user is logged out', () => {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/login')
    })
  })
})
