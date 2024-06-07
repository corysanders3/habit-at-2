describe('navigating to the home page', () => {
  beforeEach(() => {
    cy.intercept('GET', `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/1/habits`, {
      statusCode: 200,
      fixture: "habits.json",
      timeout: 10000
    }).as('userHabits')
    cy.intercept('GET', `https://habitat-1873f8f155b9.herokuapp.com/api/v0/plants`, {
      statusCode: 200,
      fixture: "plants.json",
      timeout: 10000
    }).as('plants')
    cy.intercept('GET', `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/1/habits/29/progresses`, {
      statusCode: 200,
      fixture: "progressHabit29.json",
      timeout: 10000
    }).as('userProgress29')
    cy.intercept('GET', `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/1/habits/30/progresses`, {
      statusCode: 200,
      fixture: "progressHabit30.json",
      timeout: 10000
    }).as('userProgress30')
    cy.intercept('GET', `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/1/habits/29/habit_plant`, {
      statusCode: 200,
      fixture: "plantScale29.json",
      timeout: 10000
    }).as('plantScale29')
    cy.intercept('GET', `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/1/habits/30/habit_plant`, {
      statusCode: 200,
      fixture: "plantScale30.json",
      timeout: 10000
    }).as('plantScale30')
    cy.intercept('GET', `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/1/habits/31/habit_plant`, {
      statusCode: 200,
      fixture: "plantScale31.json",
      timeout: 10000
    }).as('plantScale31')
    it('should load all user flowers', () => {
      cy.get('.garden-scene')
    })
    cy.visit('http://localhost:3000/')
  })

  it('should load nav bar with NavLinks', () => {
    cy.get('h1').contains('Habit-at')
      .get('button').contains('New Habit')

    cy.get('a[href="/"]').eq(1).should('be.visible').and('have.text', 'Home').click()
    cy.url().should('eq', 'http://localhost:3000/')

    cy.get('a[href="/calendar"]').should('be.visible').and('have.text', 'Calendar').click()
    cy.url().should('eq', 'http://localhost:3000/calendar')
  })

  it('should load garden scene along with user flowers', () => {
    cy.wait(2000)
    cy.get('canvas').matchImageSnapshot('scene', {
      failureThreshold: 0.001,
      failureThresholdType: 'percent'
    })
  })
})