import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfileForm from '../components/EditProfileForm';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';

const UserProfile = ({ isAuthenticated, setAuth, logout }) => {
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

  console.log(isAuthenticated);

  useEffect(() => {
    checkAuth();
    getUserData();
    getUsername();
  }, []);

  return (
    <div>
      <Navbar username={username} logout={logout}></Navbar>
      <div className='container px-md-5'>
        <div className='mt-5'>
          <EditProfileForm userData={userData}></EditProfileForm>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
