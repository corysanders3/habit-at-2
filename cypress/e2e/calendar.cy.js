describe('Calendar page', () => {
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
    cy.visit('http://localhost:3000/calendar')
  })

  it('Should display current month and all active user habits', () => {
    cy.get('.calendar-page').contains('h2', 'June 2024')
    cy.get('div').contains('span', 'Study')
  })

  it('Should be able to view previous months and future months', () => {
    cy.get('.fc-prev-button').click()
    cy.get('.calendar-page').contains('h2', 'May 2024')
    cy.get('div').contains('span', 'Study')
    cy.get('div').contains('span', 'Draw')

    cy.get('.fc-next-button').click().click()
    cy.get('.calendar-page').contains('h2', 'July 2024')
    cy.get('div').should('not.have.text', 'Study')
    cy.get('div').should('not.have.text', 'Draw')
  })

  it('Should allow the user to view and edit habit details, and log progress', () => {
    cy.get('div').contains('span', 'Study').click()
    cy.get('form').get('h1').contains('Habit View')
    cy.get('form').get(
      `input[name='name']` &&
      `textarea[name='description']` &&
      `select[name='frequency']` &&
      `input[name='monday']` &&
      `input[name='tuesday']` &&
      `input[name='wednesday']` &&
      `input[name='thursday']` &&
      `input[name='friday']` &&
      `input[name='saturday']` &&
      `input[name='sunday']` &&
      `input[name='startDate']` &&
      `input[name='endDate']`
    )

    cy.get('form').get('button').contains('Edit')
    cy.get('form').get('button').contains('Submit Changes')
    cy.get('form').get('button').contains('Mark Habit Complete')
    cy.get('form').get('button').contains('Close').click()
    cy.get('form').should('not.exist')
  })
})


