import React, { useContext, useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LayananContext } from '../../context/LayananContext';
import FooterAdmin from '../../components/FooterAdmin';

const AdminDashboard = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();
  const { surname, getUserData } = useContext(UserContext);
  const [dummy, setDummy] = useState('');
  const [layanan, setLayanan] = useState([]);
  const [aduan, setAduan] = useState([]);
  const [countLayananTotal, setCountLayananTotal] = useState(0);
  const [countLayananReview, setCountLayananReview] = useState(0);
  const [countLayananSelesai, setCountLayananSelesai] = useState(0);
  const [countPublic, setCountPublic] = useState(0);
  const [countAdmin, setCountAdmin] = useState(0);
  const [countPetugas, setCountPetugas] = useState(0);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: 'GET',
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();

      if (parseRes === 'Not Authorized') {
        console.log('test');
        navigate('/login');
      }

      if (parseRes.role === 'public' || parseRes.role === 'petugas') {
        navigate('/forbidden');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getLayanan = async () => {
    const response = await fetch('http://localhost:5000/layanan/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
    });

    const parseRes = await response.json();

    const layananTotal = parseRes.data;
    const layananReview = parseRes.data.filter((item) => item.status_layanan === 'Menunggu proses review');
    const layananSelesai = parseRes.data.filter((item) => item.status_layanan === 'Selesai');

    let layananTerbaru = [];
    let n = 0;
    if (layananReview.length !== 0) {
      layananReview.forEach((item) => {
        layananTerbaru.push(item);
      });
      setLayanan(layananTerbaru);
      console.log(layananTerbaru);
    }

    setCountLayananTotal(getCount(layananTotal));
    setCountLayananReview(getCount(layananReview));
    setCountLayananSelesai(getCount(layananSelesai));
  };

  const getPengguna = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      const publik = parseRes.data.filter((item) => item.role === 'public');
      const admin = parseRes.data.filter((item) => item.role === 'admin');
      const petugas = parseRes.data.filter((item) => item.role === 'petugas');

      setCountPublic(getCount(publik));
      setCountAdmin(getCount(admin));
      setCountPetugas(getCount(petugas));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAduan = async () => {
    try {
      const response = await fetch('http://localhost:5000/lapor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();

      setAduan(parseRes.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getCount = (data) => {
    let n = 0;
    data.forEach((item) => {
      ++n;
    });

    return n;
  };

  const handleEvent = (params) => {
    navigate(`/admin-detail-layanan/${params.row.id_permintaan}`);
  };

  const handleEventAduan = (params) => {
    navigate(`/admin-detail-aduan/${params.row.id_aduan}`);
  };

  const columns = [
    { field: 'urutan', headerName: 'Urutan', width: 70 },
    { field: 'id_permintaan', headerName: 'Req. ID', width: 300, sortable: false },
    { field: 'tanggal_selesai', headerName: 'Tgl. Selesai', width: 110, renderCell: (params) => moment(params.row.tanggal_selesai).format('YYYY-MM-DD') },
    {
      field: 'nama_pemohon',
      headerName: 'Nama Pemohon',
      width: 200,
    },
    {
      field: 'no_hp_pemohon',
      headerName: 'No. Hp',
      width: 120,
      sortable: false,
    },
    {
      field: 'alamat_kecamatan',
      headerName: 'Kecamatan',
      width: 120,
    },
    {
      field: 'jumlah_sampah',
      headerName: 'Jml. Sampah',
      type: 'number',
      width: 110,
    },
    {
      field: 'status_layanan',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => {
        return <div className='badge text-bg-warning text-light'>{params.row.status_layanan}</div>;
      },
    },
  ];

  const columnsAduan = [
    {
      field: 'tanggal_aduan',
      headerName: 'Tgl. Aduan',
      width: 120,
      renderCell: (params) => moment(params.row.tanggal_aduan).format('YYYY-MM-DD'),
    },
    {
      field: 'deskripsi',
      headerName: 'Deskripsi',
      width: 200,
    },
    {
      field: 'nama_pelapor',
      headerName: 'Nama Pelapor',
      width: 120,
    },
    {
      field: 'nomor_kontak',
      headerName: 'Kontak',
      width: 120,
      sortable: false,
    },
    {
      field: 'jenis_aduan',
      headerName: 'Jenis Aduan',
      width: 160,
    },
  ];

  const variant = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  };

  useEffect(() => {
    checkAuth();
    getUserData();
    getLayanan();
    getPengguna();
    getAduan();
  }, []);

  return (
    <div className='admin-container'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={isOpen ? 'admin-body' : 'admin-body-closed'}>
        <AdminNavbar logout={logout} />
        <div className='admin-content'>
          <h2 className='mb-5 mt-2'>Halo, {surname}!</h2>
          <div className='row'>
            <div className='col-md-8'>
              <div className='row'>
                <div className='col'>
                  <h5 className='fw-bold mb-2' onClick={() => navigate('/admin-daftar-layanan')}>
                    Ringkasan Layanan
                  </h5>
                  <div className='card'>
                    <div className='card-body d-grid'>
                      <div className='row'>
                        <div className='col pe-0'>
                          <div className='card-text-white bg-primary'>
                            <div className='card-body'>
                              <Typography>Total Permintaan</Typography>
                              <h1 className='fw-bold mt-2 mb-0'>{countLayananTotal}</h1>
                            </div>
                          </div>
                        </div>
                        <div className='col pe-0'>
                          <div className='card-text-white bg-warning'>
                            <div className='card-body'>
                              <Typography>Belum Direview</Typography>
                              <h1 className='fw-bold mt-2 mb-0'>{countLayananReview}</h1>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div className='card-text-white bg-success'>
                            <div className='card-body'>
                              <Typography>Selesai</Typography>
                              <h1 className='fw-bold mt-2 mb-0'>{countLayananSelesai}</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='card-footer d-flex justify-content-end'>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        initial='initial'
                        whileHover='animate'
                        className='btn btn-info d-flex'
                        onClick={() => {
                          navigate('/admin-daftar-layanan');
                        }}
                      >
                        <motion.div variants={variant} className='me-1'>
                          <ArrowForwardIcon></ArrowForwardIcon>
                        </motion.div>
                        <div>Lihat lebih rinci</div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mt-4'>
                <div className='col'>
                  <h5 className='fw-bold mb-2' onClick={() => navigate('/admin-daftar-layanan')}>
                    Ringkasan Pengguna
                  </h5>
                  <div className='card'>
                    <div className='card-body d-grid'>
                      <div className='row'>
                        <div className='col pe-0'>
                          <div className='card-text-white bg-secondary'>
                            <div className='card-body'>
                              <Typography>Public</Typography>
                              <h1 className='fw-bold mt-2 mb-0'>{countPublic}</h1>
                            </div>
                          </div>
                        </div>
                        <div className='col pe-0'>
                          <div className='card-text-white bg-secondary'>
                            <div className='card-body'>
                              <Typography>Admin</Typography>
                              <h1 className='fw-bold mt-2 mb-0'>{countAdmin}</h1>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div className='card-text-white bg-secondary'>
                            <div className='card-body'>
                              <Typography>Petugas</Typography>
                              <h1 className='fw-bold mt-2 mb-0'>{countPetugas}</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='card-footer d-flex justify-content-end'>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        initial='initial'
                        whileHover='animate'
                        className='btn btn-info d-flex'
                        onClick={() => {
                          navigate('/admin-daftar-pengguna');
                        }}
                      >
                        <motion.div variants={variant} className='me-1'>
                          <ArrowForwardIcon></ArrowForwardIcon>
                        </motion.div>
                        <div>Lihat lebih rinci</div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col'>
              <motion.h5
                whileHover={{
                  x: 5,
                }}
                whileTap={{ scale: 0.9 }}
                className='fw-bold mb-2 cursor-ptr hover-underline'
                onClick={() => navigate('/admin-daftar-layanan')}
                style={{ display: 'inline-block' }}
              >
                Aduan Terkini
              </motion.h5>
              <div className='shadow-sm' style={{ width: '100%', height: 460 }}>
                <DataGrid
                  onRowClick={handleEventAduan}
                  rows={aduan}
                  columns={columnsAduan}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => row.id_aduan}
                  sx={{
                    '& .MuiDataGrid-root': {
                      backgroundColor: '#f6f6f6',
                    },
                    '& .MuiDataGrid-row': {
                      '&:nth-of-type(even)': { backgroundColor: 'rgba(222, 222, 222, .7)' },
                      '&:hover': { backgroundColor: 'rgba(215, 215, 215, .7)' },
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#205295',
                      color: 'whitesmoke',
                      '& .MuiSvgIcon-root': {
                        color: 'whitesmoke',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <motion.h5
                whileHover={{
                  x: 5,
                }}
                whileTap={{ scale: 0.9 }}
                className='fw-bold mb-2 cursor-ptr hover-underline mt-5'
                onClick={() => navigate('/admin-daftar-layanan')}
                style={{ display: 'inline-block' }}
              >
                Permintaan Terbaru
              </motion.h5>
              <div className='shadow-sm' style={{ width: '100%', height: 400 }}>
                <DataGrid
                  onRowClick={handleEvent}
                  rows={layanan}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => row.id_permintaan}
                  sx={{
                    '& .MuiDataGrid-root': {
                      backgroundColor: '#f6f6f6',
                    },
                    '& .MuiDataGrid-row': {
                      '&:nth-of-type(even)': { backgroundColor: 'rgba(222, 222, 222, .7)' },
                      '&:hover': { backgroundColor: 'rgba(215, 215, 215, .7)' },
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#205295',
                      color: 'whitesmoke',
                      '& .MuiSvgIcon-root': {
                        color: 'whitesmoke',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <FooterAdmin></FooterAdmin>
      </div>
    </div>
  );
};

export default AdminDashboard;
