import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import Sidebar from '../../components/Sidebar';
import Home from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TambahPetugas = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username_pengguna: '',
    email_pengguna: '',
    password: '',
    nama_depan_pengguna: '',
    nama_belakang_pengguna: '',
    no_hp_pengguna: '',
    role: 'petugas',
  });

  const [usernameError, setUsernameError] = useState({
    redOutline: '',
    msg: '',
  });

  const [emailError, setEmailError] = useState({
    redOutline: '',
    msg: '',
  });

  const [passwordError, setPasswordError] = useState({
    redOutline: '',
    msg: '',
  });

  const [noHpError, setNoHpError] = useState({
    redOutline: '',
    msg: '',
  });

  const { username_pengguna, email_pengguna, password, nama_depan_pengguna, nama_belakang_pengguna, no_hp_pengguna, role } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { username_pengguna, email_pengguna, password, nama_depan_pengguna, nama_belakang_pengguna, no_hp_pengguna, role };

      const response = await fetch('http://localhost:5000/user/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      console.log(parseRes);

      if (parseRes.errors) {
        setUsernameError({ redOutline: '', msg: '' });
        setEmailError({ redOutline: '', msg: '' });
        setPasswordError({ redOutline: '', msg: '' });
        setNoHpError({ redOutline: '', msg: '' });

        parseRes.errors.forEach((error) => {
          if (error.param === 'username_pengguna') {
            setUsernameError({ redOutline: 'red-outline', msg: error.msg });
          } else if (error.param === 'email_pengguna') {
            setEmailError({ redOutline: 'red-outline', msg: error.msg });
          } else if (error.param === 'password') {
            setPasswordError({ redOutline: 'red-outline', msg: error.msg });
          } else if (error.param === 'no_hp_pengguna') {
            setNoHpError({ redOutline: 'red-outline', msg: error.msg });
          }
        });
      }

      if (parseRes.status === 'created') {
        setInputs({ username_pengguna: '', email_pengguna: '', password: '', nama_depan_pengguna: '', nama_belakang_pengguna: '', no_hp_pengguna: '', role: 'admin' });
        toast.success('Berhasil menambahkan petugas!');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuth();
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
            <Link underline='hover' color='inherit' href='/admin-daftar-pengguna'>
              Daftar Pengguna
            </Link>
            <Typography color='text.primary'>Tambah Petugas</Typography>
          </Breadcrumbs>
          <h2 className='mb-3 mt-2'>Tambah Petugas</h2>
          <div className='card'>
            <div className='card-body'>
              <form method='POST' onSubmit={(e) => onSubmitHandler(e)}>
                <div className='row mb-3'>
                  <div className='col-md-3 text-end align-text-center'>
                    <label htmlFor='username_pengguna'>Username</label>
                  </div>
                  <div className='col'>
                    <input type='text' className={`form-control no-outline ${usernameError.redOutline}`} name='username_pengguna' value={username_pengguna} onChange={(e) => onChange(e)} placeholder='Masukkan username...' required />
                    <div id='usernameHelp' className='form-text d-flex align-items-center text-danger'>
                      {usernameError.msg}
                    </div>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-md-3 text-end align-text-center'>
                    <label htmlFor='email_pengguna'>Email</label>
                  </div>
                  <div className='col'>
                    <input type='text' className={`form-control no-outline ${emailError.redOutline}`} name='email_pengguna' value={email_pengguna} onChange={(e) => onChange(e)} placeholder='Masukkan email...' required />
                    <div id='emailHelp' className='form-text d-flex align-items-center text-danger'>
                      {emailError.msg}
                    </div>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-md-3 text-end align-text-center'>
                    <label htmlFor='password'>Password</label>
                  </div>
                  <div className='col'>
                    <input type='password' className={`form-control no-outline ${passwordError.redOutline}`} name='password' placeholder='Masukkan password...' value={password} onChange={(e) => onChange(e)} required />
                    <div id='pwHelp' className='form-text d-flex align-items-center text-danger'>
                      {passwordError.msg}
                    </div>
                    <div id='passwordHelp' className='form-text d-flex align-items-center'>
                      <InfoIcon className='fs-6 me-1' />
                      Password ini hanya semetara dan diharapkan diganti untuk alasan keamanan.
                    </div>
                    <div id='passwordError' className='form-text'></div>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-md-3 text-end align-text-center'>
                    <label htmlFor='nama_depan_pengguna'>Nama Depan</label>
                  </div>
                  <div className='col'>
                    <input type='text' className='form-control no-outline' name='nama_depan_pengguna' placeholder='Masukkan nama depan...' value={nama_depan_pengguna} onChange={(e) => onChange(e)} required />
                    <div id='depanHelp' className='form-text d-flex align-items-center'></div>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-md-3 text-end align-text-center'>
                    <label htmlFor='nama_belakang_pengguna'>Nama Belakang</label>
                  </div>
                  <div className='col'>
                    <input type='text' className='form-control no-outline' name='nama_belakang_pengguna' placeholder='Masukkan nama belakang...' value={nama_belakang_pengguna} onChange={(e) => onChange(e)} required />
                    <div id='belakang Help' className='form-text d-flex align-items-center'></div>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-md-3 text-end align-text-center'>
                    <label htmlFor='no_hp_pengguna'>No. Hp</label>
                  </div>
                  <div className='col'>
                    <input type='text' className={`form-control no-outline ${noHpError.redOutline}`} name='no_hp_pengguna' placeholder='Masukkan nomor hp...' value={no_hp_pengguna} onChange={(e) => onChange(e)} required />
                    <div id='noHpHelp' className='form-text d-flex align-items-center text-danger'>
                      {noHpError.msg}
                    </div>
                  </div>
                </div>
                <div className='row mb-4'>
                  <div className='col-md-3 text-end align-text-center'>
                    <label htmlFor='role'>Role</label>
                  </div>
                  <div className='col'>
                    <input type='text' className='form-control no-outline' name='role' value={role} disabled required />
                  </div>
                </div>
                <div className='row'>
                  <div className='col d-flex justify-content-end'>
                    <button type='submit' className='btn btn-info'>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahPetugas;
