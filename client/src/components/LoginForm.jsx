import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthFinder from "../apis/AuthFinder";

const LoginForm = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password };

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);

        toast.success("Berhasil login!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='card shadow-lg rounded-0 login-card m-0 p-lg-5'>
      <div className='text-center p-4 pb-0'>
        <div className='fw-bold fs-2'>Login</div>
        <span className='text-muted'></span>
        <hr></hr>
      </div>
      <div className='card-body d-flex flex-column justify-content-between'>
        <form onSubmit={onSubmitForm} method='POST'>
          <div className='mb-3'>
            <input type='text' className='form-control no-outline' name='username' placeholder='Username' value={username} onChange={(e) => onChange(e)} />
          </div>
          <div className='mb-2'>
            <input type='password' className='form-control no-outline' name='password' placeholder='Password' value={password} onChange={(e) => onChange(e)} />
          </div>
          <div>
            <p className='d-flex justify-content-end pe-0 text-sm small-text'>
              <a href='#'>Lupa password?</a>
            </p>
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn btn-info py-2 no-outline mt-3'>
              Login
            </button>
          </div>
        </form>
        <p className='mt-5 text-center'>
          Belum punya akun? <a href='/register'>Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
