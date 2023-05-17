import React, { useContext, useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PetugasSidebar from '../../components/PetugasSidebar';

const PetugasDashboard = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();

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

      if (parseRes.role === 'public' || parseRes.role === 'admin') {
        navigate('/forbidden');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className='admin-container'>
      <PetugasSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={isOpen ? 'admin-body' : 'admin-body-closed'}>
        <AdminNavbar logout={logout} />
        <div className='admin-content'>
          <h2 className='mb-3 mt-2'>Petugas Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default PetugasDashboard;
