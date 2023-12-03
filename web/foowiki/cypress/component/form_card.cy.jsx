import Form_card from '@/components/form_card'

describe('form_card.cy.jsx', () => {
  context('720p resolution', () => {
        beforeEach(() => {
            cy.viewport(1280, 720)
        })
        it('have logged in', () => {
            // see: https://on.cypress.io/mounting-react
            cy.mount(<Form_card cardType="login"/>)
        })
        it('have not logged in',()=>{
            cy.mount(<Form_card cardType="register"/>)
        })
    })
})