import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import Home from '@mui/icons-material/Home';
import { Breadcrumbs, IconButton, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DaftarAduan = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();
  const [aduan, setAduan] = useState([]);

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

  const deleteAduan = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:5000/lapor/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setAduan(aduan.filter((aduan) => aduan.id_aduan !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEvent = (params) => {
    navigate(`/admin-detail-aduan/${params.row.id_aduan}`);
  };

  const columnsAduan = [
    {
      field: 'id_aduan',
      headerName: 'Id',
      width: 120,
    },
    {
      field: 'tanggal_aduan',
      headerName: 'Tgl. Aduan',
      width: 120,
      renderCell: (params) => moment(params.row.tanggal_aduan).format('YYYY-MM-DD'),
    },
    {
      field: 'deskripsi',
      headerName: 'Deskripsi',
      width: 600,
    },
    {
      field: 'nama_pelapor',
      headerName: 'Nama Pelapor',
      width: 170,
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
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <IconButton aria-label='edit' onClick={() => navigate(`/admin-detail-aduan/${params.row.id_aduan}`)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label='delete' color='error'>
              <DeleteIcon onClick={(e) => deleteAduan(e, params.row.id_aduan)} />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    checkAuth();
    getAduan();
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
            <Typography color='text.primary'>Daftar Aduan</Typography>
          </Breadcrumbs>
          <h2 className='mb-3 mt-2'>Daftar Aduan</h2>
          <div className='shadow-sm' style={{ width: '100%' }}>
            <div style={{ height: 600 }}>
              <DataGrid
                onRowClick={handleEvent}
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
      </div>
    </div>
  );
};

export default DaftarAduan;
