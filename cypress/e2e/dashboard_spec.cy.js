describe('test test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.expect(true).to.equal(true)
    cy.get('h1').contains('hello')
    cy.get('h2').contains('hi')
  })
})