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
    it('test login succeed',()=>{
      let username = "csf111"
      let password = "123456"
      cy.visit("http://127.0.0.1:3000/login")
      cy.get('input[name*="Username"]').type(username)
      cy.get('input[name*="Password"]').type(password)

      cy.get('button[type*="submit"]').click().then(()=>{
        cy.on('window:alert',(message) => {
            expect(message).to.equal('登录成功')

            cy.window().then((win) => {
              win.alert = () => true
            })
          })
        cy.url().should('include','/dishes')
      })
    })

    it('test login fail',()=>{
      let username = "csf111"
      let password = "111111"
      cy.visit("http://127.0.0.1:3000/login")
      cy.get('input[name*="Username"]').type(username)
      cy.get('input[name*="Password"]').type(password)

      cy.get('button[type*="submit"]').click().then(()=>{
        cy.on('window:alert',(message) => {
            expect(message).to.equal('密码错误')

            cy.window().then((win) => {
              win.alert = () => true
            })
          })
      })
    })

    it('test login fail 2',()=>{
      let username = "csf11111"
      let password = "111111"
      cy.visit("http://127.0.0.1:3000/login")
      cy.get('input[name*="Username"]').type(username)
      cy.get('input[name*="Password"]').type(password)

      cy.get('button[type*="submit"]').click().then(()=>{
        cy.on('window:alert',(message) => {
            expect(message).to.equal('登录失败')

            cy.window().then((win) => {
              win.alert = () => true
            })
          })
      })
    })
  })

})