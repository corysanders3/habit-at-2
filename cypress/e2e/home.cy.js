describe('navigating to the home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should load all user flowers', () => {
    cy.get('.garden-scene')
  })

  it('should load nav bar', () => {
    cy.get('h1').contains('Habit-at')
    .get('button').contains('New Habit')
  })

})