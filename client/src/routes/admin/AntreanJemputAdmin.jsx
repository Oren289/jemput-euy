import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import Sidebar from '../../components/Sidebar';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Home from '@mui/icons-material/Home';
import { Breadcrumbs, IconButton, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FooterAdmin from '../../components/FooterAdmin';

const AntreanJemputAdmin = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();
  const [antreanJemput, setAntreanJemput] = useState('');

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

      if (parseRes.role === 'public' || parseRes.role === 'petugas') {
        navigate('/forbidden');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAntreanJemput = async () => {
    try {
      const response = await fetch('http://localhost:5000/layanan/antrean-jemput', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setAntreanJemput(parseRes.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const columns = [
    { field: 'urutan', headerName: 'Urutan', width: 70 },
    { field: 'id_permintaan', headerName: 'Req. ID', width: 300, sortable: false },
    { field: 'tanggal_diterima', headerName: 'Tgl. Diterima', width: 110, renderCell: (params) => moment(params.row.tanggal_diterima).format('YYYY-MM-DD') },
    {
      field: 'username_pengguna',
      headerName: 'Username Pemohon',
      width: 120,
    },
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
      width: 150,
      renderCell: (params) => {
        if (params.row.status_layanan === 'Menunggu proses review') {
          return <div className='badge text-bg-warning text-light'>{params.row.status_layanan}</div>;
        } else if (params.row.status_layanan === 'Menunggu penjemputan') {
          return <div className='badge text-bg-info text-light'>{params.row.status_layanan}</div>;
        } else if (params.row.status_layanan === 'Selesai') {
          return <div className='badge text-bg-success'>{params.row.status_layanan}</div>;
        } else if (params.row.status_layanan === 'Ditolak') {
          return <div className='badge text-bg-danger'>{params.row.status_layanan}</div>;
        } else {
          return <div className='badge text-bg-primary'>{params.row.status_layanan}</div>;
        }
      },
    },
    {
      field: 'aksi',
      headerName: 'Aksi',
      sortable: false,
      filterable: false,
      width: 90,
      renderCell: (params) => {
        return (
          <div>
            <IconButton aria-label='edit' onClick={() => navigate(`/petugas-detail-layanan/${params.row.id_permintaan}`)}>
              <EditIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    checkAuth();
    getAntreanJemput();
  }, []);

  return (
    <div className='admin-container'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={isOpen ? 'admin-body' : 'admin-body-closed'}>
        <AdminNavbar logout={logout} />
        <div className='admin-content'>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/admin-dashboard'>
              <Home></Home>
            </Link>
            <Typography color='text.primary'>Antrean Jemput</Typography>
          </Breadcrumbs>
          <h2 className='mb-3 mt-2'>Antrean Jemput</h2>
          <div className='card p-4 shadow-sm' style={{ width: '100%', height: 600 }}>
            <DataGrid
              rows={antreanJemput}
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
        <FooterAdmin></FooterAdmin>
      </div>
    </div>
  );
};

export default AntreanJemputAdmin;
