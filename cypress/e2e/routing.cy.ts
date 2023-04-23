describe('routing', () => {
  it('should display home page when visiting base url', () => {
    cy.visit('/')

    cy.contains('Nestark')
  })

  it('should display 404 page when visiting /unknown url', () => {
    cy.visit({
      url: '/unknown',
      failOnStatusCode: false,
    })

    cy.contains('Not found')
  })

  it('should display 404 page when visiting /12345 url', () => {
    cy.visit({
      url: '/12345',
      failOnStatusCode: false,
    })

    cy.contains('Not found')
  })
})
