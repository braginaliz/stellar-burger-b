/// <reference types="cypress" />

describe('Интеграционные тесты конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' }).as(
      'loginUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Добавление ингредиента в конструктор', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093d"]')
      .find('button')
      .click();
    cy.get('[data-testid="constructor-area"]').should(
      'contain',
      'Флюоресцентная булка R2-D3'
    );

    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();
    cy.get('[data-testid="constructor-area"]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('Работа модальных окон', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093d"]').click();
    cy.get('[data-testid="modal"]').should('be.visible');

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093d"]').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-overlay"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('Создание заказа', () => {
    cy.request('POST', '/api/auth/login', {
      email: 'test@example.com',
      password: 'password'
    });

    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093d"]')
      .find('button')
      .click();
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    cy.get('[data-testid="order-button"]').click();
    cy.wait('@createOrder');

    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal"]').should('contain', '70752');

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="constructor-area"]').should('be.empty');
  });
});
