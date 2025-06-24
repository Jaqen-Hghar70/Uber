import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/captainContext';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);

  // Use the correct token key for captain
  const token = localStorage.getItem('captainToken');
  console.log('captainToken:', token);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching captain profile:', error);
        localStorage.removeItem('captainToken');
        navigate('/captain-login');
      });
  }, [token, navigate, setCaptain]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
};

export default CaptainProtectedWrapper;