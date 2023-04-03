import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFinder from "../apis/AuthFinder";

const RegisterForm = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username_pengguna: "",
    password: "",
    nama_depan_pengguna: "",
    nama_belakang_pengguna: "",
    email_pengguna: "",
    no_hp_pengguna: "",
  });

  const navigate = useNavigate();

  const { username_pengguna, password, nama_depan_pengguna, nama_belakang_pengguna, email_pengguna, no_hp_pengguna } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        username_pengguna,
        password,
        nama_depan_pengguna,
        nama_belakang_pengguna,
        email_pengguna,
        no_hp_pengguna,
        role: "public",
      };

      const response = await AuthFinder.post("/register", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // const response = await fetch("http://localhost:5000/auth/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(body),
      // });

      // const parseRes = await response.json();

      // console.log(parseRes);

      localStorage.setItem("token", response.data.token);

      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='card shadow'>
      <div className='row'>
        <div className='backgroundRegister rounded-start col-md-6 p-5 d-none d-md-flex align-items-center justify-content-center'>
          <h3 className='display-4 text-light fw-bold'>UPT Pengelolaan Sampah.</h3>
        </div>
        <div className='col-md-6 pb-0 ps-md-5 pt-md-5 pe-md-5'>
          <div className='text-center'>
            <div className='fw-bold fs-2'>Daftar</div>
            <span className='text-muted'>Cepat dan gampang</span>
            <hr></hr>
          </div>
          <div className='card-body mx-3'>
            <form onSubmit={onSubmitForm} method='POST'>
              <div className='row mb-3'>
                <input type='text' className='form-control no-outline' placeholder='Username' name='username_pengguna' value={username_pengguna} onChange={(e) => onChange(e)} />
              </div>
              <div className='row mb-3'>
                <div className='col p-0 pe-2'>
                  <input type='text' className='form-control no-outline' placeholder='Nama depan' name='nama_depan_pengguna' value={nama_depan_pengguna} onChange={(e) => onChange(e)} />
                </div>
                <div className='col p-0 ps-2'>
                  <input type='text' className='form-control no-outline' placeholder='Nama belakang' name='nama_belakang_pengguna' value={nama_belakang_pengguna} onChange={(e) => onChange(e)} />
                </div>
              </div>
              <div className='row mb-3'>
                <input type='email' className='form-control no-outline' placeholder='Email' name='email_pengguna' value={email_pengguna} onChange={(e) => onChange(e)} />
              </div>
              <div className='row mb-3'>
                <input type='text' className='form-control no-outline' placeholder='Nomor handphone' name='no_hp_pengguna' value={no_hp_pengguna} onChange={(e) => onChange(e)} />
              </div>
              <div className='row mb-3'>
                <input type='password' className='form-control no-outline' placeholder='Password baru' name='password' value={password} onChange={(e) => onChange(e)} />
              </div>
              <div className='row d-grid mt-4'>
                <button type='submit' className='btn py-2 btn-info no-outline mb-5'>
                  Daftar
                </button>
              </div>
            </form>
            <p className='mt-4 text-center'>
              Sudah punya akun? <a href='/login'>Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
