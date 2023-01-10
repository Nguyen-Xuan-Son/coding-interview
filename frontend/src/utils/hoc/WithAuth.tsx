import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';

import { LOCAL_STORAGE_KEYS } from '../../constant';

const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (LOCAL_STORAGE_KEYS.ACCESS_TOKEN in localStorage) return;
    redirect('/login');
  }, [dispatch]);

  return <>{children}</>;
};

export default WithAuth;
