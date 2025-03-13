import rootReducer from '../rootReducer';
import { UserReducer } from '../UserSlice';
import { ingredientsReducer } from '../IngredientSlice';
import { combinedOrderReducer } from '../OrdersSlice';
import { feedsReducer } from '../FeedSlice';
import { constructorReducer } from '../ConstructorSlice';


describe('rootReducer', () => {
 it('должен инициализироваться с правильным начальными состоянием', () => {
   const initialState = rootReducer(undefined, { type: '@@INIT' });


   expect(initialState).toEqual({
     user: UserReducer(undefined, { type: '@@INIT' }),
     burgerConstructor: constructorReducer(undefined, { type: '@@INIT' }),
     ingredients: ingredientsReducer(undefined, { type: '@@INIT' }),
     feeds: feedsReducer(undefined, { type: '@@INIT' }),
     combinedorder: combinedOrderReducer(undefined, { type: '@@INIT' }),
   });
 });


 it('должен возвращать начальное состояние при вызове с неизвестным действием', () => {
   const unknownAction = { type: 'UNKNOWN_ACTION' };
   const initialState = rootReducer(undefined, unknownAction);


   expect(initialState).toEqual({
     user: UserReducer(undefined, unknownAction),
     burgerConstructor: constructorReducer(undefined, unknownAction),
     ingredients: ingredientsReducer(undefined, unknownAction),
     feeds: feedsReducer(undefined, unknownAction),
     combinedorder: combinedOrderReducer(undefined, unknownAction),
   });
 });
});
