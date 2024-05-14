describe('test test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.expect(true).to.equal(true)
  })
})