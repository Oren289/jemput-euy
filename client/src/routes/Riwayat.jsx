import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayananForm from '../components/LayananForm';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import ListRiwayat from '../components/ListRiwayat';

const Riwayat = ({ logout }) => {
  const navigate = useNavigate();
  const { username, getUserData } = useContext(UserContext);
  const [riwayat, setRiwayat] = useState([]);
  const [dataSampah, setDataSampah] = useState([]);

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

  const getRiwayat = async () => {
    try {
      const response = await fetch('http://localhost:5000/layanan/riwayat-pengguna', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setRiwayat(parseRes.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getJenisSampah = async () => {
    try {
      const response = await fetch(`http://localhost:5000/layanan/jenis-sampah`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setDataSampah(parseRes.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuth();
    getUserData();
    getRiwayat();
    getJenisSampah();
  }, []);

  return (
    <div>
      <Navbar logout={logout} username={username}></Navbar>
      <div className='container px-md-5 mt-5'>
        <div className='card'>
          <div className='card-header'>
            <h3 className='fw-bold mb-0'>Riwayat</h3>
          </div>
          <div className='card-body'>
            <ListRiwayat riwayat={riwayat} dataSampah={dataSampah}></ListRiwayat>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riwayat;
