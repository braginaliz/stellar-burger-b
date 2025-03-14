import { ingredientsReducer } from '../IngredientSlice';
import { fetchIngredients } from '../../action/AllActions';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    isLoad: false,
    error: null
  };

  it('должен инициализироваться с правильным начальным состоянием', () => {
    const state = ingredientsReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('должен обрабатывать fetchIngredients.pending', () => {
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.pending('fetchIngredients')
    );
    expect(newState.isLoad).toBe(true);
    expect(newState.error).toBe(null);
  });

  it('должен обрабатывать fetchIngredients.fulfilled', () => {
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0949',
        name: 'Мини-салат Экзо-Плантаго',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 6,
        price: 4400,
        image: 'https://code.s3.yandex.net/react/code/salad.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      }
    ];

    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(ingredients, 'fetchIngredients')
    );

    expect(newState.isLoad).toBe(false);
    expect(newState.items).toEqual(ingredients);
  });

  it('должен обрабатывать fetchIngredients.rejected', () => {
    const error = new Error('Ошибка получения ингредиентов');
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(error, 'fetchIngredients')
    );

    expect(newState.isLoad).toBe(false);
    expect(newState.error).toBe(error.message);
  });
});
