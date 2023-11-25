describe('index test', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })
    it('test the dishes link', () => {
      cy.visit('http://127.0.0.1:3000')
      cy.get('a[href="/dishes"]').click().then(()=>{
        cy.url().should('include','/dishes')
      })
    })
    it('test the login link', () => {
      cy.visit('http://127.0.0.1:3000')
      cy.get('a[href="/login"]').click().then(()=>{
        cy.url().should('include','/login')
      })
    })
    it('test the register link', () => {
      cy.visit('http://127.0.0.1:3000')
      cy.get('a[href="/register"]').click().then(()=>{
        cy.url().should('include','/register')
      })
    })
  })

  context('iphone', () => {
    beforeEach(() => {
      cy.viewport('iphone-5')
    })
    it('test the dishes link', () => {
      cy.visit('http://127.0.0.1:3000')
      cy.get('a[href="/dishes"]').click().then(()=>{
        cy.url().should('include','/dishes')
      })
    })
    it('test the login link', () => {
      cy.visit('http://127.0.0.1:3000')
      cy.get('a[href="/login"]').click().then(()=>{
        cy.url().should('include','/login')
      })
    })
  })
})