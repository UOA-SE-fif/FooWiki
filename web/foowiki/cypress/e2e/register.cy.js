describe('template spec', () => {
  it('back to login', () => {
    cy.visit('http://127.0.0.1:3000')

    cy.get('a[href*="/login"]')
  })
})