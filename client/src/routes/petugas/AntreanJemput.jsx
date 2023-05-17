import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import Home from '@mui/icons-material/Home';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PetugasSidebar from '../../components/PetugasSidebar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const AntreanJemput = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');
  const [antreanJemput, setAntreanJemput] = useState('');
  const [untukDijemput, setUntukDijemput] = useState('');
  const [sedangDijemput, setSedangDijemput] = useState('');

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

      if (parseRes.role === 'public' || parseRes.role === 'admin') {
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
      setAntreanJemput(parseRes.data);
      setUntukDijemput(parseRes.data.filter((item) => item.status_layanan === 'Menunggu penjemputan'));
      setSedangDijemput(parseRes.data.filter((item) => item.status_layanan === 'Sedang dijemput'));
    } catch (error) {
      console.error(error.message);
    }
  };

  const columns = [
    { field: 'urutan', headerName: 'Urutan', width: 70 },
    { field: 'id_permintaan', headerName: 'Req. ID', width: 300, sortable: false },
    { field: 'tanggal_diterima', headerName: 'Tgl. Diterima', width: 110, renderCell: (params) => moment(params.row.tanggal_diterima).format('YYYY-MM-DD') },
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
        if (params.row.status_layanan === 'Menunggu penjemputan') {
          return <div className='badge text-bg-info text-light'>{params.row.status_layanan}</div>;
        } else {
          return <div className='badge text-bg-primary'>{params.row.status_layanan}</div>;
        }
      },
    },
  ];

  const handleEvent = (params) => {
    navigate(`/petugas-detail-layanan/${params.row.id_permintaan}`);
  };

  useEffect(() => {
    checkAuth();
    getAntreanJemput();
  }, []);

  return (
    <div className='admin-container'>
      <PetugasSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
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
          <div className='shadow-sm' style={{ width: '100%' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label='lab API tabs example'>
                  <Tab label='Semua' value='1' />
                  <Tab label='Untuk dijemput' value='2' />
                  <Tab label='Sedang Dijemput' value='3' />
                </TabList>
              </Box>
              <TabPanel value='1'>
                <div style={{ height: 600 }}>
                  <DataGrid
                    onRowClick={handleEvent}
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
              </TabPanel>
              <TabPanel value='2'>
                <div style={{ height: 600 }}>
                  <DataGrid
                    onRowClick={handleEvent}
                    rows={untukDijemput}
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
              </TabPanel>
              <TabPanel value='3'>
                <div style={{ height: 600 }}>
                  <DataGrid
                    onRowClick={handleEvent}
                    rows={sedangDijemput}
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
              </TabPanel>
            </TabContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntreanJemput;
