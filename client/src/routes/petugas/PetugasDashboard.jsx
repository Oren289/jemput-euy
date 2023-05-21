import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PetugasSidebar from '../../components/PetugasSidebar';
import FooterAdmin from '../../components/FooterAdmin';
import PetugasNavbar from '../../components/PetugasNavbar';
import { DataGrid } from '@mui/x-data-grid';
import HistoryIcon from '@mui/icons-material/History';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import moment from 'moment';

const PetugasDashboard = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();
  const { surname, getUserData } = useContext(UserContext);
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
    getUserData();
  }, []);

  return (
    <div className='admin-container'>
      <PetugasSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={isOpen ? 'admin-body' : 'admin-body-closed'}>
        <PetugasNavbar logout={logout} />
        <div className='admin-content'>
          <h2 className='mb-3 mt-2'>Halo petugas {surname}!</h2>
          <div className='card'>
            <div className='card-header'>Menu Cepat</div>
            <div className='card-body'>
              <div className='row'>
                <div className='col pe-md-0 d-grid'>
                  <button className='btn btn-info p-5' onClick={() => navigate('/petugas-antrean-jemput')}>
                    <LocalShippingIcon></LocalShippingIcon> Antrean Jemput
                  </button>
                </div>
                <div className='col d-grid'>
                  <button className='btn btn-info' onClick={() => navigate('/petugas-riwayat')}>
                    <HistoryIcon></HistoryIcon> Riwayat
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='card mt-4'>
            <div className='card-header'>Antrian Jemput</div>
            <div className='card-body' style={{ height: 500 }}>
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
          </div>
        </div>
        <FooterAdmin></FooterAdmin>
      </div>
    </div>
  );
};

export default PetugasDashboard;
