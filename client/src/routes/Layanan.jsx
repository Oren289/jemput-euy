import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayananForm from '../components/LayananForm';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';

const Layanan = ({ logout }) => {
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

      if (parseRes === 'Not Authorized') {
        console.log('test');
        navigate('/login');
      }

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
      <Navbar logout={logout} username={username}></Navbar>
      <div className='container px-md-5 mt-5'>
        <LayananForm></LayananForm>
      </div>
    </div>
  );
};

export default Layanan;
