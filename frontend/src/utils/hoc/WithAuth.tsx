import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LOCAL_STORAGE_KEYS } from '../../constant';

const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (LOCAL_STORAGE_KEYS.ACCESS_TOKEN in localStorage) return;
    navigate('/login');
  }, [dispatch, navigate]);

  return <>{children}</>;
};

export default WithAuth;
