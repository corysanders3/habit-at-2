describe('navigating to the form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should load nav bar and allow user to click to display form', () => {
    cy.get('button').contains('New Habit').click()
    .get('h3').contains('Create a New Habit')
    .get('.habit-form').get(
        `input[name='name']` && 
        `input[name='description']` &&
        `input[name='frequency']` &&
        `input[name='monday']` &&
        `input[name='tuesday']` &&
        `input[name='wednesday']` &&
        `input[name='thursday']` &&
        `input[name='friday']` &&
        `input[name='saturday']` &&
        `input[name='sunday']` &&
        `input[name='flower']` &&
        `input[name='startDate']` &&
        `input[name='endDate']`
      )
    .get('.habit-form').get('label').contains('Habit Name' && 'Habit Description')
    .get('.habit-form').get('p').contains('Frequency')
    .get('.frequency-container').contains('Daily' && 'Weekly' && 'Monthly')
    .get('.flowers-container').children().should('have.length', 4)
    .get('.date-container').get('label').contains('Start Date:' && 'Start Time:' && 'End Date:')
    .get('.button-container').children().get('button').contains('Submit' && 'Close')
  })

  it('should allow user to submit and POST form', () => {
    cy.intercept('POST', 'https://18f66003-e0a9-4a86-82df-017b56517af9.mock.pstmn.io/users/1/habits', {
      statusCode: 201,
      body: {
        "id": "3",
        "type": "habit",
        "attributes": {
            "user_id": "1",
            "name": "Practice for interviews", 
            "description": "I want to practice 30min a day for interviews", 
            "frequency": "daily", 
            "custom_frequency": {
                "monday": true, 
                "tuesday": true,
                "wednesday": true,
                "thursday": true,
                "friday": true, 
                "saturday": true,
                "sunday": true
            },
            "start_datetime": "2024-05-14 8:35:20",
            "end_datetime": "2024-12-14 8:35:20",
            "status": "in_progress"
        }
    }
  }).as('postHabit')

  cy.get('button').contains('New Habit').click()
    .get('.habit-form').get(`input[name='name']`).type('Practice for interviews').should('have.value', 'Practice for interviews')
    .get('.habit-form').get(`input[name='description']`).type('I want to practice 30min a day for interviews').should('have.value', 'I want to practice 30min a day for interviews')
    .get('.habit-form').get(`input[name='frequency']`).check('daily').should('have.value', 'daily')
    .get('.habit-form').get(`input[name='flower']`).check('1').should('have.value', '1')
    .get('.habit-form').get(`input[name='startDate']`).type('2024-05-14')
    .get('.habit-form').get(`input[name='startTime']`).type('08:35')
    .get('.habit-form').get(`input[name='endDate']`).type('2024-12-14')
    .get('.habit-form').get(`input[name='endTime']`).type('08:35')
    .get('button').contains('Submit').click()
  })
})