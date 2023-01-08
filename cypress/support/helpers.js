export const createList = (listname, task) => {
  cy.log('type the list name')
  cy.get(':nth-child(2) > .inputbox').type(listname)
  cy.log('type the task name')
  cy.get(':nth-child(5) > .inputbox').type(task)
  cy.get('#addItemButton').click()
  cy.log('submitting the new list')
  cy.get('.buttons > p > :nth-child(1)').click()
  cy.get('#swal2-title').contains('list created!')
}

export const addtask = (task) => {
  cy.log('type the task name')
  cy.get('.component_body > input').clear()
  cy.get('.component_body > input').type(task)
  cy.log('adding the task to a list')
  cy.get(':nth-child(2) > :nth-child(2) > div > [aria-label="Add Item"]').click()
}
