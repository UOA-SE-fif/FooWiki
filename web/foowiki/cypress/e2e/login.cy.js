describe('login test', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })
    it('test to register',()=>{
      cy.visit("http://127.0.0.1:3000/login")
      cy.get('a[href*="/register"]').click().then(()=>{
        cy.url().should('include','/register')
      })
    })
    it('test login function',()=>{
      let username = "csf111"
      let password = "123456"
      cy.visit("http://127.0.0.1:3000/login")
      cy.get('input[name*="Username"]').type(username)
      cy.get('input[name*="Password"]').type(password)

      cy.get('button[type*="submit"]').click().then(()=>{
        cy.url().should('include','/dishes')
      })
    })
  })

  context('iphone', () => {
    beforeEach(() => {
      cy.viewport('iphone-5')
    })
  })
})