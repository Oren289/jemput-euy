import Home from '@mui/icons-material/Home';
import { Breadcrumbs, IconButton, Link, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import Sidebar from '../../components/Sidebar';
import Select from 'react-select';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useLoadScript } from '@react-google-maps/api';
import Map from '../../components/Map';
import MapSimple from '../../components/MapSimple';
import FooterAdmin from '../../components/FooterAdmin';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: 'none',
  outline: 'none',
};

const libraries = ['places'];

const DetailLayanan = ({ isOpen, setIsOpen, logout }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyDCzjmZxIrRDVlC4L_JPUC8VXl43LNC2qQ', libraries });
  const [dataLayanan, setDataLayanan] = useState({});
  const [dataSampah, setDataSampah] = useState([]);
  const [statusLayanan, setStatusLayanan] = useState({ value: '' });
  const [listPetugas, setListPetugas] = useState([]);
  const [penanggungjawab, setPenanggungjawab] = useState('');
  const [open, setOpen] = useState(false);
  const id = useParams();

  const navigate = useNavigate();

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPetugas = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      const dataPetugas = parseRes.data.filter((item) => item.role === 'petugas');
      let arrayPetugas = [];
      dataPetugas.forEach((petugas) => {
        arrayPetugas.push({ value: petugas.username_pengguna, label: petugas.username_pengguna });
      });
      setListPetugas(arrayPetugas);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getDataLayanan = async () => {
    try {
      const response = await fetch(`http://localhost:5000/layanan/${id.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setDataLayanan(parseRes.data[0]);
      setStatusLayanan({ value: parseRes.data[0].status_layanan, label: parseRes.data[0].status_layanan });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getJenisSampah = async () => {
    try {
      const response = await fetch(`http://localhost:5000/layanan/jenis-sampah/${id.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setDataSampah(parseRes.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { statusLayanan };

      const response = await fetch(`http://localhost:5000/layanan/ganti-status/${id.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      toast.success('Data berhasil diperbarui!');
      navigate('/admin-daftar-layanan');
    } catch (error) {
      console.error(error.message);
    }
  };

  const onUsernamePetugasSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/layanan/update-petugas/${id.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(penanggungjawab),
      });

      const parseRes = await response.json();
      toast.success('Data berhasil diperbarui!');
      navigate('/admin-daftar-layanan');
    } catch (error) {
      console.error(error.message);
    }
  };

  const selectOptions = [
    { value: 'Menunggu proses review', label: 'Menunggu proses review' },
    { value: 'Menunggu penjemputan', label: 'Menunggu penjemputan' },
    { value: 'Sedang dijemput', label: 'Sedang dijemput' },
    { value: 'Selesai', label: 'Selesai' },
    { value: 'Ditolak', label: 'Ditolak' },
  ];

  useEffect(() => {
    checkAuth();
    getDataLayanan();
    getJenisSampah();
    getPetugas();
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
            <Link underline='hover' color='inherit' href='/admin-daftar-layanan'>
              Daftar Layanan
            </Link>
            <Typography color='text.primary'>Detail Layanan ({dataLayanan.nama_pemohon})</Typography>
          </Breadcrumbs>
          <h2 className='mb-3 mt-2'>Detail Layanan</h2>
          <div class='card'>
            <div class='card-body'>
              <div className='d-flex justify-content-between align-item-center'>
                <h5 class='card-title'>Id: {dataLayanan.id_permintaan}</h5>
                <h5 class='card-title'>Urutan: {dataLayanan.urutan}</h5>
              </div>
              <hr />
              <div className='row'>
                <div className='col-lg-5'>
                  <div className='card max-height-col'>
                    <div className='card-header pb-0'>
                      <h6>Detail Pemohon</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row mb-3'>
                        <div className='col-4'>Nama Pemohon</div>
                        <div className='col'>{dataLayanan.nama_pemohon}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Username Pemohon</div>
                        <div className='col'>{dataLayanan.username_pengguna}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>No. Hp Pemohon</div>
                        <div className='col'>{dataLayanan.no_hp_pemohon}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Kecamatan</div>
                        <div className='col'>{dataLayanan.alamat_kecamatan}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Kelurahan</div>
                        <div className='col'>{dataLayanan.alamat_kelurahan}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Keterangan</div>
                        <div className='col'>{dataLayanan.alamat_ket_tambahan}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='card max-height-col'>
                    <div className='card-header pb-0'>
                      <h6>Detail Permohonan</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row mb-3'>
                        <div className='col-4'>Kecamatan</div>
                        <div className='col'>{dataLayanan.alamat_kecamatan}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Kelurahan</div>
                        <div className='col'>{dataLayanan.alamat_kelurahan}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Keterangan</div>
                        <div className='col'>{dataLayanan.alamat_ket_tambahan}</div>
                      </div>
                      <hr />
                      <div className='row mb-3'>
                        <div className='col-4'>Jumlah Sampah</div>
                        <div className='col'>{dataLayanan.jumlah_sampah}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Jenis Sampah</div>
                        <div className='col d-flex'>
                          {dataSampah.map((item) => {
                            return (
                              <div key={item.index} className='badge text-bg-secondary me-1 d-flex align-items-center'>
                                {item.sampah}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Keterangan</div>
                        <div className='col'>{dataLayanan.keterangan_tambahan}</div>
                      </div>
                      <hr />
                      <div className='row mb-3'>
                        <div className='col-4'>Tanggal Diterima</div>
                        <div className='col'>{moment(dataLayanan.tanggal_diterima).format('YYYY-MM-DD')}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Tanggal Selesai</div>
                        <div className='col'>{dataLayanan.tanggal_selesai !== null ? moment(dataLayanan.tanggal_selesai).format('YYYY-MM-DD') : '-'}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Penanggungjawab</div>
                        <div className='col d-flex'>
                          <div className='me-2'>{dataLayanan.username_petugas !== null ? dataLayanan.username_petugas : <div className='text-danger'>belum ditetapkan</div>}</div>
                          <div onClick={handleOpen}>
                            <EditIcon></EditIcon>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className='row mb-3'>
                          <div className='col-4'>Status Layanan</div>
                          <div className='col d-flex align-items-center'>
                            <div className='col'>
                              <Select className='basic-single me-2' classNamePrefix='select' value={statusLayanan} name='statusLayanan' options={selectOptions} onChange={(item) => setStatusLayanan(item)} />
                            </div>
                            <div className='col-2'>
                              <button className='btn btn-info d-flex align-items-center'>
                                <SaveIcon></SaveIcon>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='d-flex justify-content-end'></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col'>
                  <div className='card max-height-col'>
                    <div className='card-header pb-0'>
                      <h6>Titik Alamat</h6>
                    </div>
                    <div className='card-body'>{!isLoaded ? <div>Loading...</div> : <MapSimple coordinate={{ lat: parseFloat(dataLayanan.alamat_latitude), lng: parseFloat(dataLayanan.alamat_longitude) }}></MapSimple>}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterAdmin></FooterAdmin>
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <form onSubmit={(e) => onUsernamePetugasSubmitHandler(e)}>
          <Box className='card' sx={style}>
            <div className='card-header'>Penanggungjawab</div>
            <div className='card-body'>
              <Select className='basic-single me-2' classNamePrefix='select' value={penanggungjawab} name='penanggungjawab' options={listPetugas} onChange={(item) => setPenanggungjawab(item)} />
            </div>
            <div className='card-footer d-flex justify-content-end'>
              <button type='button' onClick={handleClose} className='btn btn-danger me-2'>
                Batal
              </button>
              <button type='submit' className='btn btn-success'>
                Kirim
              </button>
            </div>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default DetailLayanan;
