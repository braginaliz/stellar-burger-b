/// <reference types="cypress" />

import tokens from '../../fixtures/token.json';
import { setCookie, deleteCookie } from '../../../src/utils/cookie';
import order from '../../fixtures/order.json';
import ingredients from '../../fixtures/ingredients.json';
import type {} from '../../support/cypress'



Cypress.Commands.add('clickElement', (name) => {
  cy.get(name).find('button').click();
});

describe('Тестирование главной страницы', () => {
  before(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('fetchIngredients');
  });

  beforeEach(() => {
    cy.visit('http://localhost:4000/');

    setCookie('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);

    cy.wait('@fetchIngredients');

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('fetchUser');
    cy.wait('@fetchUser');


    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').as('bunItem');
    cy.get('[data-cy="643d69a5c3f7b9001cfa093e"]').as('fillingItem');
    cy.get('[data-cy="643d69a5c3f7b9001cfa0942"]').as('sauceItem');
  });

  describe('Тестирование создания заказа', () => {
    afterEach(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    });

    it('Отправка заказа', () => {
      cy.clickElement('@bunItem');
      cy.clickElement('@fillingItem');
      cy.clickElement('@sauceItem');

    
      cy.get('[data-cy="orderButton"]').should('be.enabled').click();
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('placeOrder');
      cy.wait('@placeOrder');

      cy.get('[data-cy="modal"]').as('orderModal');
      cy.get('@orderModal').should('exist')
        .find('h2').contains(order.orders[0].number);

      cy.clickElement('@orderModal');
      cy.get('@orderModal').should('not.exist');
      
      cy.get('[data-cy="constructorItemNoBun"]').should('exist');
      cy.get('[data-cy="constructorItemNoFillings"]').should('exist');
    });
  });

  it('Добавление ингредиентов в конструктор', () => {
    cy.clickElement('@bunItem');
    cy.get('[data-cy="constructorItemBun"]')
      .find('span')
      .contains('Краторная булка N-200i')
      .should('exist');

    cy.clickElement('@fillingItem');
    cy.get('[data-cy="constructorItemFilling"]')
      .find('span')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');

    cy.clickElement('@sauceItem');
    cy.get('[data-cy="constructorItemSauce"]') 
      .find('span')
      .contains('Соус Spicy-X')
      .should('exist');
  });

  describe('Тестирование модального окна ингредиента', () => {
    beforeEach(() => {
      cy.get('@bunItem').find('a').click();
      cy.get('[data-cy="modal"]').as('ingredientModal');
    });

    it('Открытие модального окна', () => {
      cy.get('@ingredientModal').should('exist');
    });

    it('Закрытие по клику на крестик', () => {
      cy.clickElement('@ingredientModal');
      cy.get('@ingredientModal').should('not.exist');
    });

    it('Закрытие по клику на оверлей', () => {
      cy.get('[data-cy="modalOverlay"]').click({ force: true });
      cy.get('@ingredientModal').should('not.exist');
    });
  });
});