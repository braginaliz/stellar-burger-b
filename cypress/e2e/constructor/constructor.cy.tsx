describe('Тестирование функционала сборки бургеров', () => {
  const selectors = {
      modalWindow: '[data-cy=modal]',
      ingredientCategory: '[data-cy=ingredients-category]',
      closeButton: '[data-cy=close]',
      overlay: '[data-cy=overlay]',
  };

  const messages = {
      chooseFilling: 'Выберите начинку',
      chooseBun: 'Выберите булки',
      ingredientDescription: 'Описание ингредиента',
  };

  const titles = {
      buns: 'Булки',
      fillings: 'Начинки',
      sauces: 'Соусы',
  };

  it('Проверка доступности сервера на localhost:4000', () => {
      cy.visit('/');
  });

  beforeEach(() => {
  
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('fetchIngredients');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('retrieveUser');
      
      cy.setCookie('accessToken', 'mockAccessToken');
      localStorage.setItem('refreshToken', 'mockRefreshToken');
      cy.visit('http://localhost:4000');
  });

  afterEach(() => {
      cy.setCookie('accessToken', '');
      localStorage.setItem('refreshToken', '');
  });

  context('Работа с модальными окнами', () => {
      beforeEach(() => {
          cy.get(selectors.ingredientCategory).find('li').first().as('ingredientButton');
      });

      it('Отображение модального окна для ингредиента', () => {
          cy.get(selectors.modalWindow).should('not.exist');
          cy.get('@ingredientButton').click();
          cy.get(selectors.modalWindow).should('be.visible');
          cy.contains(messages.ingredientDescription).should('exist');
      });

      it('Закрытие модального окна кнопкой', () => {
          cy.get('@ingredientButton').click();
          cy.get(selectors.modalWindow).should('be.visible');
          cy.get(selectors.closeButton).click();
          cy.get(selectors.modalWindow).should('not.exist');
      });

      it('Закрытие окна нажатем на фон', () => {
          cy.get('@ingredientButton').click();
          cy.get(selectors.modalWindow).should('be.visible');
          cy.get(selectors.overlay).click({ force: true });
          cy.get(selectors.modalWindow).should('not.exist');
      });
  });

  context('Процесс оформления заказа', () => {
      context('Добавление компонентов для бургера', () => {
          it('Выбор булочек', () => {
              cy.get('div').contains(messages.chooseBun).should('exist');
              const addBunButton = cy.get('h3').contains(titles.buns).next('ul').contains('Добавить');
              addBunButton.click({ force: true });
              
              cy.get('ul').contains('Краторная булка N-200i').should('exist');
          });

          it('Добавление начинки', () => {
              cy.get('div').contains(messages.chooseFilling).should('exist');
              const addFillingButton = cy.get('h3').contains(titles.fillings).next('ul').contains('Добавить');
              addFillingButton.click({ force: true });
              cy.get('div').contains(messages.chooseFilling).should('not.exist');
          });

          it('Добавление соусов', () => {
              cy.get('div').contains(messages.chooseFilling).should('exist');
              const addSauceButton = cy.get('h3').contains(titles.sauces).next('ul').contains('Добавить');
              addSauceButton.click({ force: true });
              cy.get('div').contains(messages.chooseFilling).should('not.exist');
          });
      });

      it('Оформление заказа', () => {
          cy.intercept('POST', 'api/orders', {
              fixture: 'order.json'
          }).as('postOrders');

          cy.get(selectors.modalWindow).should('not.exist');

          const buttonAddBun = cy.get('h3').contains(titles.buns).next('ul').contains('Добавить');
          const buttonAddMain = cy.get('h3').contains(titles.fillings).next('ul').contains('Добавить');
          const buttonAddSauce = cy.get('h3').contains(titles.sauces).next('ul').contains('Добавить');

          buttonAddBun.click();
          buttonAddMain.click();
          buttonAddSauce.click();

          const buttonMakeOrder = cy.contains('Оформить заказ');
          buttonMakeOrder.click();

          cy.get(selectors.modalWindow).should('be.visible');
          cy.contains('1234').should('exist');

          cy.get(selectors.closeButton).click();
          cy.get(selectors.modalWindow).should('not.exist');
          cy.contains('1234').should('not.exist');

          cy.contains(messages.chooseBun).should('exist');
          cy.contains(messages.chooseFilling).should('exist');
      });
  });
});