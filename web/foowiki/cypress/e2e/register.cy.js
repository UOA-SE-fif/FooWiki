describe('register', () => {
  it('back to login', () => {
    cy.visit('http://127.0.0.1:3000/register')

    cy.get('a[href*="/login"]').click().then(() => {
      cy.url().should('include','/login')
    })
  })

  it('not username', ()=>{
    let username = ""
    let email = "testEmail@test.com"
    let password = "123"
    let confirm_password = "123"
    cy.visit('http://127.0.0.1:3000/register')

    cy.get('input[name*="Username"]')
    cy.get('input[name*="email"]').type(email)
    cy.get('input[id*="password"]').type(password)
    cy.get('input[id*="confirmPassword"]').type(confirm_password)

    cy.get('button[type*="submit"]').click()
      cy.on("window:alert", (message) => {
         expect(message).to.equal('请输入完整的信息')

            cy.window().then((win) => {
              win.alert = () => true
            })
          })
    })


  it('password different', ()=>{
    let username = "111"
    let email = "testEmail@test.com"
    let password = "123"
    let confirm_password = "111"
    cy.visit('http://127.0.0.1:3000/register')

    cy.get('input[name*="Username"]').type(username)
    cy.get('input[name*="email"]').type(email)
    cy.get('input[id*="password"]').type(password)
    cy.get('input[id*="confirmPassword"]').type(confirm_password)

    cy.get('button[type*="submit"]').click()
      cy.on("window:alert", (message) => {
         expect(message).to.equal('两次输入的密码不一致')

            cy.window().then((win) => {
              win.alert = () => true
            })
          })
  })

  it('email error', ()=>{
    let username = "222"
    let email = "testEmailtest.com"
    let password = "123"
    let confirm_password = "123"
    cy.visit('http://127.0.0.1:3000/register')

    cy.get('input[name*="Username"]').type(username)
    cy.get('input[name*="email"]').type(email)
    cy.get('input[id*="password"]').type(password)
    cy.get('input[id*="confirmPassword"]').type(confirm_password)

    cy.get('button[type*="submit"]').click()
      cy.on("window:alert", (message) => {
         expect(message).to.equal('请输入正确的邮箱地址')

            cy.window().then((win) => {
              win.alert = () => true
            })
          })
  })

  it('user exist', ()=>{
    let username = "csf"
    let email = "testEmail@test.com"
    let password = "123"
    let confirm_password = "123"
    cy.visit('http://127.0.0.1:3000/register')

    cy.get('input[name*="Username"]').type(username)
    cy.get('input[name*="email"]').type(email)
    cy.get('input[id*="password"]').type(password)
    cy.get('input[id*="confirmPassword"]').type(confirm_password)

    cy.get('button[type*="submit"]').click()
      cy.on("window:alert", (message) => {
         expect(message).to.equal('用户名已注册')

            cy.window().then((win) => {
              win.alert = () => true
            })
          })
  })

  it('email exists', ()=>{
    let username = "333"
    let email = "2050203751@qq.com"
    let password = "123"
    let confirm_password = "123"
    cy.visit('http://127.0.0.1:3000/register')

    cy.get('input[name*="Username"]').type(username)
    cy.get('input[name*="email"]').type(email)
    cy.get('input[id*="password"]').type(password)
    cy.get('input[id*="confirmPassword"]').type(confirm_password)

    cy.get('button[type*="submit"]').click()

    cy.on("window:alert", (message) => {
         expect(message).to.equal('用户名已注册')

            cy.window().then((win) => {
              win.alert = () => true
            })
          })
  })

  it('success', () => {
    let username = "444"
    let email = "testEmail@test.com"
    let password = "123"
    let confirm_password = "123"
    cy.visit('http://127.0.0.1:3000/register')

    cy.get('input[name*="Username"]').type(username)
    cy.get('input[name*="email"]').type(email)
    cy.get('input[id*="password"]').type(password)
    cy.get('input[id*="confirmPassword"]').type(confirm_password)

    cy.get('button[type*="submit"]').click()
      cy.on("window:alert", (message) => {
         expect(message).to.equal('注册成功')

            cy.window().then((win) => {
              win.alert = () => true
            })
          })
  })
})