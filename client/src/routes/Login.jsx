import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = ({ setAuth }) => {
  return (
    <div className='d-flex justify-content-between backgroundLogin'>
      <div className='d-flex align-items-center ps-5'>
        <h3 className='display-4 text-light fw-bold'>UPT Pengelolaan Sampah.</h3>
      </div>
      <div className='login-card-container'>
        <LoginForm setAuth={setAuth}></LoginForm>
      </div>
    </div>
  );
};

export default Login;
