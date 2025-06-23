import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  console.log(token)

  useEffect(() => {
    if (!token) {
      navigate('/user-login');
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default UserProtectedWrapper;