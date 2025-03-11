import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../action/AllActions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  const { orders } = useSelector((state) => state.feeds);
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
