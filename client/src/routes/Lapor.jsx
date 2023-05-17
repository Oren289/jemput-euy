import React, { useContext, useEffect } from 'react';
import LaporForm from '../components/LaporForm';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Lapor = ({ logout }) => {
  const navigate = useNavigate();
  const { username, getUserData } = useContext(UserContext);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: 'GET',
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (parseRes.role === 'admin' || parseRes.role === 'petugas') {
        navigate('/forbidden');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
    checkAuth();
  }, []);

  return (
    <div>
      <Navbar username={username} logout={logout}></Navbar>
      <div className='container px-md-5 mt-5'>
        <LaporForm></LaporForm>
      </div>
    </div>
  );
};

export default Lapor;
