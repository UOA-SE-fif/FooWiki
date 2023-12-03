describe('login test', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:3000/')
    cy.request('POST','api/login',{username:'csf111',password:'123456'}).then((res)=>{
      expect(res.status).to.equal(200)
      expect(res.headers).to.have.property('set-cookie')
      cy.getCookie('fooWikiAuth').then((cookies) => {
        cy.log(cookies.value)
        expect(cookies.value).to.not.equal("")
      })
    })
  })

  it('not passes', () => {
    cy.visit('http://127.0.0.1:3000/')
    cy.request({
      method:"POST",
      url:"/api/login",
      failOnStatusCode: false
    }).then((res)=>{
      expect(res.status).to.equal(401)
      expect(res.headers).to.have.property('set-cookie')
      cy.getCookie('fooWikiAuth').then((cookies) => {
        cy.log(Array.from(cookies.value).map(char => char.charCodeAt(0)))
        expect(cookies.value).to.equal("")
      })
    })
  })
})