/// <reference types="Cypress" />

describe('Go to Pizza Ordering Site', function() {
    it('Fills out the form', function() {
        cy.visit('/');

        cy.get('[data-cy=name-fld]')
            .type('liz')
            .should('have.value', 'liz');

        cy.get('[data-cy=size-fld]')
            .select('12')
            .should('have.value', '12');

        cy.get('[data-cy=pepperoni-fld]')
            .click()
            .should('have.checked', true);

        cy.get('[data-cy=peppers-fld]')
            .click()
            .should('have.checked', true);

        cy.get('[data-cy=sausage-fld]')
            .click()
            .should('have.checked', true);

        cy.get('[data-cy=pineapple-fld]')
            .click()
            .should('have.checked', true);

        cy.get('[data-cy=instructions-fld]')
            .type('Extra crispy')
            .should('have.value', 'Extra crispy');
        
        cy.get('[data-cy=order-btn]')
            .should('be.enabled');
    })

    it('Checks error messages', function() {
        cy.get('[data-cy=name-fld]')
           .clear();
            
           cy.get('[data-cy=name-err]')
            .contains('Please tell us your name');


        cy.get('[data-cy=name-fld]')
            .clear()
            .type('l');
            
        cy.get('[data-cy=name-err]')
            .contains('Names must be at least 2 letters');


        cy.get('[data-cy=size-fld]')
            .select('');
        
        cy.get('[data-cy=size-err]')
            .contains('Choose a size');

        cy.get('[data-cy=order-btn]')
            .should('be.disabled');
   })
})