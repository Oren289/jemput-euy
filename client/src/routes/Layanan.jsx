import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayananForm from '../components/LayananForm';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import Footer from '../components/Footer';
import Jumbotron from '../components/Jumbotron';
import CustomJumbotron from '../components/CustomJumbotron';

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
    <div className='page-container'>
      <div className='content-wrap'>
        <Navbar logout={logout} username={username}></Navbar>
        <CustomJumbotron title={'Formulir Layanan'} body={'Isi formulir di bawah untuk pendaftaran layanan penjemputan sampah besar'}></CustomJumbotron>
        <div className='container px-md-5 mt-5'>
          <LayananForm></LayananForm>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layanan;
