describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('displays login button', () => {
    cy.get('.login-button')
  })
})
