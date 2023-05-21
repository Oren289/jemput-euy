import React, { useContext, useEffect } from 'react';
import LaporForm from '../components/LaporForm';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import CustomJumbotron from '../components/CustomJumbotron';

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
    <div className='page-container'>
      <div className='content-wrap'>
        <Navbar username={username} logout={logout}></Navbar>
        <CustomJumbotron title={'Formulir Lapor'} body={'Isi formulir di bawah untuk membuat laporan kepada UPT Pengelolaan Sampah DLH Kota Bandung'}></CustomJumbotron>
        <div className='container px-md-5 mt-5'>
          <LaporForm></LaporForm>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Lapor;
