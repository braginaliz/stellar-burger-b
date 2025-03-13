import { constructorReducer, addIngredient, removeIngredient, moveIngredient, clearConstructor } from '../ConstructorSlice';
import { TConstructorIngredient } from '../../utils/types';


describe('constructorSlice', () => {
 const initialState = {
   bun: null,
   ingredients: []
 };
  const testConstructorItems = {
   bun: {
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
     image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
     id: '593ed11e-affe-4fcb-b670-1191832be0f2'
   },
   ingredients: [
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
       image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
       image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
       id: 'c8082b8a-6f35-45eb-869c-87aa222db4e9'
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
       image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
       id: '96cdbfb7-f61c-45d9-94e4-f6d72c02e33e'
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
       image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
       image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
       id: '876b8249-c189-46e2-be3a-50d23eb2edba'
     }
   ]
 };


 it('должен инициализироваться с правильным начальным состоянием', () => {
   const state = constructorReducer(undefined, { type: '' });
   expect(state).toEqual(initialState);
 });


 it('должен обрабатывать добавление ингредиента', () => {
   const ingredient: TConstructorIngredient = {
     ...testConstructorItems.ingredients[0],
     id: '1'
   };


   const state = constructorReducer(initialState, addIngredient(ingredient));
   expect(state.ingredients).toContainEqual(expect.objectContaining({
     _id: ingredient._id,
     type: ingredient.type,
     name: ingredient.name,
     proteins: ingredient.proteins,
     fat: ingredient.fat,
     carbohydrates: ingredient.carbohydrates,
     calories: ingredient.calories,
     price: ingredient.price,
     image: ingredient.image
   }));
 });


 it('должен обрабатывать удаление ингредиента', () => {
   const ingredient: TConstructorIngredient = {
     ...testConstructorItems.ingredients[0],
     id: '1'
   };


   const stateWithIngredient = constructorReducer(initialState, addIngredient(ingredient));
   const newState = constructorReducer(stateWithIngredient, removeIngredient(stateWithIngredient.ingredients[0].id));
  
   expect(newState.ingredients).not.toContainEqual(expect.objectContaining({ _id: ingredient._id }));
 });


 it('должен обрабатывать перемещение ингредиента', () => {
   const ingredient1: TConstructorIngredient = {
     ...testConstructorItems.ingredients[0],
     id: '1'
   };
   const ingredient2: TConstructorIngredient = {
     ...testConstructorItems.ingredients[1],
     id: '2'
   };


   const stateWithIngredients = constructorReducer(initialState, addIngredient(ingredient1));
   const stateWithBothIngredients = constructorReducer(stateWithIngredients, addIngredient(ingredient2));


   const newState = constructorReducer(stateWithBothIngredients, moveIngredient({ fromIndex: 0, toIndex: 1 }));


   expect(newState.ingredients[0]._id).toBe(ingredient2._id);
   expect(newState.ingredients[1]._id).toBe(ingredient1._id);
 });


 it('должен обрабатывать очистку конструктора', () => {
   const ingredient: TConstructorIngredient = {
     ...testConstructorItems.ingredients[0],
     id: '1'
   };


   const stateWithIngredient = constructorReducer(initialState, addIngredient(ingredient));
   const newState = constructorReducer(stateWithIngredient, clearConstructor());
   expect(newState).toEqual(initialState);
 });
});

