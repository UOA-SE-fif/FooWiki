describe('My First Test', () => {
  it('Visits the FooWiki',()=>{
    cy.visit('http://127.0.0.1:3000')
    cy.contains('Sign in').click()

    cy.url().should('include', '/login')

    cy.get('input[name*="Username"]').type('csf111')
    cy.get('input[name*="Password"]').type('123456')

    cy.get('button[type*="submit"]').click()

    cy.url().should('include', 'dishes')
  })
})