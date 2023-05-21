import React, { useContext, useEffect, useMemo, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import Sidebar from '../../components/Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Home from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Breadcrumbs, IconButton, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FooterAdmin from '../../components/FooterAdmin';

const DaftarPengguna = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();

  const [pengguna, setPengguna] = useState([]);
  const [publicPengguna, setPublicPengguna] = useState([]);
  const [adminPengguna, setAdminPengguna] = useState([]);
  const [petugasPengguna, setPetugasPengguna] = useState([]);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      setPengguna(parseRes.data);
      setPublicPengguna(parseRes.data.filter((item) => item.role === 'public'));
      setAdminPengguna(parseRes.data.filter((item) => item.role === 'admin'));
      setPetugasPengguna(parseRes.data.filter((item) => item.role === 'petugas'));
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteLayanan = async (e, username) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:5000/layanan/${username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setPengguna(pengguna.filter((pengguna) => pengguna.username_pengguna !== username));
    } catch (error) {
      console.error(error.message);
    }
  };

  const columns = [
    {
      field: 'username_pengguna',
      headerName: 'Username Pengguna',
      width: 200,
    },
    {
      field: 'nama_pengguna',
      headerName: 'Nama Pengguna',
      width: 300,
      renderCell: (params) => {
        return (
          <div>
            {params.row.nama_depan_pengguna} {params.row.nama_belakang_pengguna}
          </div>
        );
      },
    },
    {
      field: 'email_pengguna',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'no_hp_pengguna',
      headerName: 'No. Hp',
      sortable: false,
      width: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      sortable: false,
      width: 100,
    },
    {
      field: 'aksi',
      headerName: 'Aksi',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <IconButton aria-label='view'>
              <VisibilityIcon />
            </IconButton>
            <IconButton aria-label='delete' color='error'>
              <DeleteIcon onClick={(e) => deleteLayanan(e, params.row.id_permintaan)} />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    checkAuth();
    getPengguna();
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
            <Typography color='text.primary'>Daftar Pengguna</Typography>
          </Breadcrumbs>
          <h2 className='mb-3 mt-2'>Daftar Pengguna</h2>
          <div className='shadow-sm' style={{ width: '100%' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label='lab API tabs example'>
                  <Tab label='Semua' value='1' />
                  <Tab label='Public' value='2' />
                  <Tab label='Admin' value='3' />
                  <Tab label='Petugas' value='4' />
                </TabList>
              </Box>
              <TabPanel value='1'>
                <div style={{ height: 600 }}>
                  <DataGrid
                    rows={pengguna}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.username_pengguna}
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
              </TabPanel>
              <TabPanel value='2'>
                <div style={{ height: 600 }}>
                  <DataGrid
                    rows={publicPengguna}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.username_pengguna}
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
              </TabPanel>
              <TabPanel value='3'>
                <div className='d-flex justify-content-end'>
                  <button onClick={() => navigate('/admin-daftar-pengguna/tambah-admin')} className='btn btn-sm btn-info d-flex align-items-center mb-3'>
                    <AddIcon className='me-1' />
                    Tambah Admin
                  </button>
                </div>
                <div style={{ height: 600 }}>
                  <DataGrid
                    rows={adminPengguna}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.username_pengguna}
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
              </TabPanel>
              <TabPanel value='4'>
                <div className='d-flex justify-content-end'>
                  <button onClick={() => navigate('/admin-daftar-pengguna/tambah-petugas')} className='btn btn-sm btn-info d-flex align-items-center mb-3'>
                    <AddIcon className='me-1' />
                    Tambah Petugas
                  </button>
                </div>
                <div style={{ height: 600 }}>
                  <DataGrid
                    rows={petugasPengguna}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.username_pengguna}
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
              </TabPanel>
            </TabContext>
          </div>
        </div>
        <FooterAdmin></FooterAdmin>
      </div>
    </div>
  );
};

export default DaftarPengguna;
