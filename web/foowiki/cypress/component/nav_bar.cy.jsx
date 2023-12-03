import Nav_bar from '@/components/nav_bar'
import {NavBar} from '@/components/NavBar'
import React from "react";

let userdata = {
    data: {
        username: "aaa",
        useravatar:null
    }
}

let notlogindata = {
    data:{}
}

describe('<Nav_bar />', () => {
    context('720p resolution', () => {
        beforeEach(() => {
            cy.viewport(1280, 720)
        })
        it('have logged in', () => {
            // see: https://on.cypress.io/mounting-react
            cy.mount(<Nav_bar user={userdata}/>)
        })
        it('have not logged in',()=>{
            cy.mount(<Nav_bar user={{}}/>)
        })
    })

    context('phone', () => {
        beforeEach(() => {
            cy.viewport('iphone-5')
        })
        it('have logged in', () => {
            // see: https://on.cypress.io/mounting-react
            cy.mount(<NavBar userData={userdata}/>)
        })
        it('have not logged in',()=>{
            cy.mount(<NavBar userData={notlogindata} linkAdress="/login"/>)
        })
    })
})