import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../slice/UserSlice';
import { loginUser } from '../../action/AllActions';

import { TAuthResponse } from '../../utils/burger-api';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(getUserAuth);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && isAuthenticated) {
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const loginData = { email, password };
    const resultAction = await dispatch(loginUser(loginData));

    if (loginUser.fulfilled.match(resultAction)) {
      const { accessToken, refreshToken, user } =
        resultAction.payload as unknown as TAuthResponse;
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);

    } else {
      alert('Введите корректные данные');
    }
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
