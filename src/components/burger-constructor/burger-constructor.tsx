import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { getOrderModalData, clearOrderState } from '../../slice/OrdersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { constructorSelector } from '../../slice/ConstructorSlice';
import { getOrderRequest } from '../../slice/OrdersSlice';
import { getUserAuth } from '../../slice/UserSlice';
import { createOrder } from '../../action/AllActions';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(constructorSelector.selectItems);
  const isAuthenticated = useSelector(getUserAuth);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    dispatch(
      createOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id)
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(clearOrderState());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients || []).reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
