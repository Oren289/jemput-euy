import React, { Fragment, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DashboardFinder from '../apis/DashboardFinder';
import Jumbotron from '../components/Jumbotron';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setAuth, role }) => {
  // const { username, getUsername } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

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

  const checkRole = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: 'GET',
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      if (parseRes.role === 'admin') {
        navigate('/admin-dashboard');
      }

      if (parseRes.role === 'petugas') {
        navigate('/petugas-dashboard');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    if (!localStorage.token) {
      toast.info('Berhasil logout!');
    }
  };

  useEffect(() => {
    getUsername();
    checkRole();
  }, []);

  return (
    <Fragment>
      <Navbar username={username} logout={logout}></Navbar>
      <Jumbotron></Jumbotron>
    </Fragment>
  );
};

export default Dashboard;
