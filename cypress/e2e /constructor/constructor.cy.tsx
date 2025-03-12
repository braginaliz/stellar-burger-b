describe('Конструктор бургера', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4000/');
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('POST', '/api/orders', { statusCode: 200, body: { success: true, order: { number: 12345 } } }).as('createOrder');
        cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    });

    it('Добавление ингредиента из списка в конструктор', () => {
        cy.wait('@getIngredients');
        cy.get('[data-test="ingredient-bun"]').first().click(); 
        cy.get('[data-test="add-to-constructor-button"]').first().click(); 
        cy.get('[data-test="constructor-count"]').should('have.text', '1');
    });

    it('Открытие и закрытие модального окна с описанием ингредиента', () => {
        cy.get('[data-test="ingredient-bun"]').first().click(); 
        cy.get('[data-test="modal"]').should('be.visible'); 
        cy.get('[data-test="modal-close"]').click(); 
        cy.get('[data-test="modal"]').should('not.exist');
    });

    it('Создание заказа', () => {
        cy.wait('@getIngredients');
        cy.get('[data-test="ingredient-bun"]').first().click(); 
        cy.get('[data-test="add-to-constructor-button"]').first().click();
        cy.get('[data-test="order-button"]').click();
        cy.wait('@createOrder').its('response.statusCode').should('eq', 200); 
        cy.get('[data-test="modal"]').should('be.visible'); 
        cy.get('[data-test="order-number"]').should('have.text', '12345'); 
        cy.get('[data-test="modal-close"]').click(); 
        cy.get('[data-test="modal"]').should('not.exist'); 
    });
});
