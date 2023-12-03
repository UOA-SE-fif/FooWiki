describe('template spec', () => {
  context('720p resolution', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
    })

    it('floor', ()=>{
      cy.visit("http://127.0.0.1:3000/dishes")

      cy.get('select[id*="floor"]').should('exist')
      cy.get('select[id*="floor"]').invoke('val','1').trigger('change').then(()=>{
        cy.get('select[id*="floor"]').should('have.value','1')
        cy.get('tbody[id*="dishesInfo"]').find('tr').each(($row, rowIndex, $rows)=>{
        cy.wrap($row).find('td').eq(4).then(($cell) =>{
          expect($cell.text()).equal('1')
        })
      })
      })


    })

    it('shop', ()=>{
      cy.visit("http://127.0.0.1:3000/dishes")

      cy.get('select[id*="shop"]').should('exist')
      cy.get('select[id*="shop"]').invoke('val','小锅猪肚鸡').trigger('change')
      cy.get('select[id*="shop"]').should('have.value','小锅猪肚鸡')

      cy.get('tbody[id*="dishesInfo"]').find('tr').each(($row, rowIndex, $rows)=>{
        cy.wrap($row).find('td').eq(3).then(($cell) =>{
          expect($cell.text()).equal('小锅猪肚鸡')
        })
      })
    })

    it('price', ()=>{
      cy.visit("http://127.0.0.1:3000/dishes")

      cy.get('input[id*="priceLeft"]').should('exist')
      cy.get('input[id*="priceRight"]').should('exist')
      cy.get('input[id*="priceLeft"]').type(10)
      cy.get('input[id*="priceRight"]').type(16)

      cy.get('tbody[id*="dishesInfo"]').find('tr').each(($row, rowIndex, $rows)=>{
        cy.wrap($row).find('td').eq(2).then(($cell) =>{
          expect(parseFloat($cell.text())).lte(16).gte(10)
        })
      })
    })

    it('all', ()=>{
      cy.visit("http://127.0.0.1:3000/dishes")

      cy.get('input[id*="priceLeft"]').should('exist')
      cy.get('input[id*="priceRight"]').should('exist')
      cy.get('input[id*="priceLeft"]').type(15)
      cy.get('input[id*="priceRight"]').type(16)

      cy.get('select[id*="shop"]').should('exist')
      cy.get('select[id*="shop"]').invoke('val','小锅猪肚鸡').trigger('change')
      cy.get('select[id*="shop"]').should('have.value','小锅猪肚鸡')

      cy.get('tbody[id*="dishesInfo"]').find('tr').each(($row, rowIndex, $rows)=>{
        cy.wrap($row).find('td').eq(2).then(($cell) =>{
          expect(parseFloat($cell.text())).lte(16).gte(15)
        })
        cy.wrap($row).find('td').eq(3).then(($cell) =>{
          expect($cell.text()).equal('小锅猪肚鸡')
        })
      })
    })
  })
})