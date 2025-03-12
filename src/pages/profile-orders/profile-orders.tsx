import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { AppDispatch, useSelector } from '../../services/store';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getUserOrders } from '../../action/AllActions';
import { getOrders } from '../../slice/OrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
