import { useSelector, useDispatch } from '../../services/store';
import { FC, useEffect } from 'react';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { getIngredients, isLoadState } from '../../slice/IngredientSlice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */

  const ingredients = useSelector(getIngredients);
  const isIngredientsLoading = useSelector(isLoadState);
  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
