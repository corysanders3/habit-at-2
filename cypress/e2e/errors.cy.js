describe('Error handling', () => {
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
    it('should load all user flowers', () => {
      cy.get('.garden-scene')
    })
    cy.visit('http://localhost:3000/')
  })

  it('Should display an error page if user navigates to invalid URL', () => {
    cy.visit('http://localhost:3000/gnome')
    cy.get('h1').contains('Page not found')
    cy.get('p').contains('404')
    cy.get('a').contains('Return Home').click()

    cy.wait(2000)
    cy.get('canvas').matchImageSnapshot('scene', {
      failureThreshold: 0.001,
      failureThresholdType: 'percent'
    })
  })

  it('Should display error notification if network request fails', () => {
    cy.intercept('GET', `https://habitat-1873f8f155b9.herokuapp.com/api/v0/users/1/habits`, {
      statusCode: 400
    })

    cy.get('h2').contains('An error has occurred: 400')
  })
})