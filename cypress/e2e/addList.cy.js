import { addtask, createList } from '../support/helpers'

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should create a new List ', () => {
    createList('cypress list', 'cypress task')
  })

  it('should add a task to the first list ', () => {
    addtask('cypress task')
  })

  it('should remove a task ', () => {
    cy.get(':nth-child(5) > .slist_small_button').click()
  })
  it('should remove a a list  ', () => {
    cy.get(':nth-child(3) > :nth-child(1) > .slist_small_title').contains('cypress list')
    cy.get(':nth-child(3) > :nth-child(1) > .slist_small_button').click()
  })
})
