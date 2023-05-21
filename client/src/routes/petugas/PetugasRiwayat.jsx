import React, { useEffect, useState } from 'react';
import PetugasSidebar from '../../components/PetugasSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import Home from '@mui/icons-material/Home';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import FooterAdmin from '../../components/FooterAdmin';
import PetugasNavbar from '../../components/PetugasNavbar';

const PetugasRiwayat = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();
  const [riwayatPenjemputan, setRiwayatPenjemputan] = useState([]);

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

  const getRiwayatPenjemputan = async () => {
    try {
      const response = await fetch('http://localhost:5000/layanan/riwayat-penjemputan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setRiwayatPenjemputan(parseRes.data.filter((item) => item.status_layanan === 'Selesai'));
    } catch (error) {
      console.error(error.message);
    }
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
        return <div className='badge text-bg-success'>{params.row.status_layanan}</div>;
      },
    },
  ];

  const handleEvent = (params) => {
    navigate(`/petugas-detail-layanan/${params.row.id_permintaan}`);
  };

  useEffect(() => {
    checkAuth();
    getRiwayatPenjemputan();
  }, []);

  return (
    <div className='admin-container'>
      <PetugasSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={isOpen ? 'admin-body' : 'admin-body-closed'}>
        <PetugasNavbar logout={logout} />
        <div className='admin-content'>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/petugas-dashboard'>
              <Home></Home>
            </Link>
            <Typography color='text.primary'>Riwayat Penjemputan</Typography>
          </Breadcrumbs>
          <h2 className='mb-3 mt-2'>Riwayat Penjemputan</h2>
          <div className='shadow-sm' style={{ width: '100%', height: 600 }}>
            <DataGrid
              onRowClick={handleEvent}
              rows={riwayatPenjemputan}
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

export default PetugasRiwayat;
