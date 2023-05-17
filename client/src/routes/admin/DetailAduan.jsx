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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: 'none',
  outline: 'none',
};

const DetailAduan = ({ isOpen, setIsOpen, logout }) => {
  const [dataAduan, setDataAduan] = useState({});
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

  const getSingleAduan = async () => {
    try {
      const response = await fetch(`http://localhost:5000/lapor/${id.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setDataAduan(parseRes.data[0]);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuth();
    getSingleAduan();
    console.log(dataAduan);
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
            <Link underline='hover' color='inherit' href='/admin-daftar-aduan'>
              Daftar Aduan
            </Link>
            <Typography color='text.primary'>Detail Aduan</Typography>
          </Breadcrumbs>
          <h2 className='mb-3 mt-2'>Detail Aduan</h2>
          <div class='card'>
            <div class='card-body'>
              <div className='d-flex align-item-center'>
                <h5 class='card-title'>Id: {dataAduan.id_aduan}</h5>
              </div>
              <hr />
              <div className='row'>
                <div className='col-lg-5'>
                  <div className='card max-height-col'>
                    <div className='card-header pb-0'>
                      <h6>Detail Pelapor</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row mb-3'>
                        <div className='col-4'>Nama</div>
                        <div className='col'>{dataAduan.nama_pelapor}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>No. Handphone</div>
                        <div className='col'>{dataAduan.nomor_kontak}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='card max-height-col'>
                    <div className='card-header pb-0'>
                      <h6>Detail Aduan</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row mb-3'>
                        <div className='col-4'>Tanggal Aduan</div>
                        <div className='col'>{moment(dataAduan.tanggal_aduan).format('DD MMM YYYY')}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Alamat</div>
                        <div className='col'>{dataAduan.alamat_lokasi}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Jenis Aduan</div>
                        <div className='col'>{dataAduan.jenis_aduan}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Deskripsi</div>
                        <div className='px-2 pt-2'>
                          <textarea name='deskrips' className='form-control' id='deskripsi' cols='30' rows='10' style={{ resize: 'none', overflow: 'auto' }} value={dataAduan.deskripsi} readOnly></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAduan;
