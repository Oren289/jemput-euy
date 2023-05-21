import React, { Fragment, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DashboardFinder from '../apis/DashboardFinder';
import Jumbotron from '../components/Jumbotron';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';
import FmdGoodTwoToneIcon from '@mui/icons-material/FmdGoodTwoTone';
import ideaImg from '../images/startup-idea.png';

const Dashboard = ({ setAuth, role }) => {
  // const { username, getUsername } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [layananCount, setLayananCount] = useState(0);
  const [layananSelesaiCount, setLayananSelesaiCount] = useState(0);
  const [layananDitolakCount, setLayananDitolakCount] = useState(0);
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

  const getCount = (data) => {
    let n = 0;
    data.forEach((item) => {
      ++n;
    });

    return n;
  };

  const getLayanan = async () => {
    try {
      const response = await fetch('http://localhost:5000/layanan/public', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const parseRes = await response.json();

      setLayananCount(getCount(parseRes.data));
      setLayananSelesaiCount(getCount(parseRes.data.filter((item) => item.status_layanan === 'Selesai')));
      setLayananDitolakCount(getCount(parseRes.data.filter((item) => item.status_layanan === 'Ditolak')));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUsername();
    checkRole();
    getLayanan();
  }, []);

  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Navbar username={username} logout={logout}></Navbar>
        <Jumbotron></Jumbotron>
        <section className='container px-md-5 py-5 text-center my-5'>
          <h1 className='fw-bold text-darker-blue'>Layanan sampah besar itu apa, sih?</h1>
          <p className='text-dashboard mt-5'>
            Layanan Jemput Sampah Besar adalah Pelayanan pengangkutan sampah yang memiliki skala besar seperti Kasur, Kursi, Lemari dan lain-lain yang kemudian diangkut oleh Petugas UPTD Pengelolaan Sampah langsung ke rumah tinggal
            masyarakat Kota Bandung tanpa dikenakan biaya.
          </p>
        </section>
        <section className='bg-light-blue py-5 my-5'>
          <div className='container px-md-5'>
            <h1 className='fw-bold text-darker-blue text-center'>Syarat Penjemputan</h1>
            <div className='mt-5'>
              <div className='row'>
                <div className='col mb-md-0 mb-4'>
                  <motion.div className='card' whileHover={{ scale: 1.02 }}>
                    <div className='card-body d-flex align-items-center px-md-5 py-md-5'>
                      <span className='fw-bold me-4'>
                        <DeleteSweepTwoToneIcon style={{ fontSize: '8em' }}></DeleteSweepTwoToneIcon>
                      </span>
                      <h3 className='fw-bold'>Maksimal sampah besar yang diangkut adalah 2 sampah besar</h3>
                    </div>
                  </motion.div>
                </div>
                <div className='col d-flex align-items-center'>
                  <motion.div className='card' whileHover={{ scale: 1.02 }}>
                    <div className='card-body d-flex align-items-center px-md-5 py-md-5'>
                      <span className='fw-bold me-4'>
                        <LocalShippingTwoToneIcon style={{ fontSize: '8em' }}></LocalShippingTwoToneIcon>
                      </span>
                      <h3 className='fw-bold'>Sampah besar sudah siap diangkut ke mobil</h3>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className='row mt-4'>
                <div className='col mb-md-0 mb-4'>
                  <motion.div className='card' whileHover={{ scale: 1.02 }}>
                    <div className='card-body d-flex align-items-center px-md-5 py-md-5'>
                      <span className='fw-bold me-4'>
                        <HomeWorkTwoToneIcon style={{ fontSize: '8em' }}></HomeWorkTwoToneIcon>
                      </span>
                      <h3 className='fw-bold'>Sampah dapat diambil di tempat yang bisa diakses mobil masuk</h3>
                    </div>
                  </motion.div>
                </div>
                <div className='col d-flex align-items-center'>
                  <motion.div className='card' whileHover={{ scale: 1.02 }}>
                    <div className='card-body d-flex align-items-center px-md-5 py-md-5'>
                      <span className='fw-bold me-4'>
                        <FmdGoodTwoToneIcon style={{ fontSize: '8em' }}></FmdGoodTwoToneIcon>
                      </span>
                      <h3 className='fw-bold'>Lokasi penjemputan adalah di Kota Bandung</h3>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='container px-md-5 py-5 text-center my-5'>
          <h1 className='fw-bold text-darker-blue text-center mb-5'>Jumlah Pendaftar Sampah Besar</h1>
          <div className='row'>
            <div className='col d-flex flex-column justify-content-center align-items-center'>
              <span className='fw-bold' style={{ fontSize: '8em' }}>
                {layananCount}
              </span>
              <div className='fw-bold' style={{ fontSize: '2.5em', marginTop: '-2rem' }}>
                Pendaftar
              </div>
            </div>
            <div className='col d-flex flex-column justify-content-center align-items-center'>
              <span className='fw-bold' style={{ fontSize: '8em' }}>
                {layananSelesaiCount}
              </span>
              <div className='fw-bold' style={{ fontSize: '2.5em', marginTop: '-2rem' }}>
                Terangkut
              </div>
            </div>
            <div className='col d-flex flex-column justify-content-center align-items-center'>
              <span className='fw-bold' style={{ fontSize: '8em' }}>
                {layananDitolakCount}
              </span>
              <div className='fw-bold' style={{ fontSize: '2.5em', marginTop: '-2rem' }}>
                Tidak Terangkut
              </div>
            </div>
          </div>
        </section>
        <section className='px-md-5 py-5 text-center my-5 bg-light-blue'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-5'>
                <img src={ideaImg} alt='' className='idea-img ms-md-5' />
              </div>
              <div className='col d-flex flex-column justify-content-center align-items-center'>
                <h1 className='fw-bold text-white mb-3'>Ayo daftar segera!</h1>
                <button className='btn btn-info' onClick={() => navigate('/layanan')}>
                  Daftar Layanan
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
