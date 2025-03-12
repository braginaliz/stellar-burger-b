describe('Конструктор бургера', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4000/'); // замените на Ваш URL
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('POST', '/api/orders', { statusCode: 200, body: { success: true, order: { number: 12345 } } }).as('createOrder');
        cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    });

    it('Добавление ингредиента из списка в конструктор', () => {
        cy.wait('@getIngredients');
        cy.get('[data-test="ingredient-bun"]').first().click(); // клик на булку для добавления
        cy.get('[data-test="add-to-constructor-button"]').first().click(); // клик на кнопку добавления в конструктор
        cy.get('[data-test="constructor-count"]').should('have.text', '1'); // проверка количества ингредиентов
    });

    it('Открытие и закрытие модального окна с описанием ингредиента', () => {
        cy.get('[data-test="ingredient-bun"]').first().click(); // открытие модального окна
        cy.get('[data-test="modal"]').should('be.visible'); // проверка, что модальное окно видно
        cy.get('[data-test="modal-close"]').click(); // закрытие модального окна
        cy.get('[data-test="modal"]').should('not.exist'); // проверка, что модальное окно закрыто
    });

    it('Создание заказа', () => {
        cy.wait('@getIngredients');
        cy.get('[data-test="ingredient-bun"]').first().click(); // клик на булку для добавления
        cy.get('[data-test="add-to-constructor-button"]').first().click(); // клик на кнопку добавления в конструктор
        cy.get('[data-test="order-button"]').click(); // оформление заказа
        cy.wait('@createOrder').its('response.statusCode').should('eq', 200); // проверка кода ответа
        cy.get('[data-test="modal"]').should('be.visible'); // проверка открытия модального окна с заказом
        cy.get('[data-test="order-number"]').should('have.text', '12345'); // проверка номера заказа
        cy.get('[data-test="modal-close"]').click(); // закрытие модального окна
        cy.get('[data-test="modal"]').should('not.exist'); // проверка, что модальное окно закрыто
    });
});
