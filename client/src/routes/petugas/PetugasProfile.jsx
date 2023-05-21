import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfileForm from '../../components/EditProfileForm';
import AdminNavbar from '../../components/AdminNavbar';
import FooterAdmin from '../../components/FooterAdmin';
import PetugasNavbar from '../../components/PetugasNavbar';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import Home from '@mui/icons-material/Home';

const PetugasProfile = ({ logout }) => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState([]);
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

  const getUsername = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setUsername(parseRes.username_pengguna);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/', {
        method: 'GET',
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setUserData(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
    getUserData();
    getUsername();
  }, []);

  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <PetugasNavbar logout={logout}></PetugasNavbar>
        <div className='container px-md-5'>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/petugas-dashboard'>
              <Home></Home>
            </Link>
            <Typography color='text.primary'>Profile saya</Typography>
          </Breadcrumbs>
          <div className='mt-5'>
            <EditProfileForm userData={userData}></EditProfileForm>
          </div>
        </div>
      </div>
      <FooterAdmin></FooterAdmin>
    </div>
  );
};

export default PetugasProfile;
