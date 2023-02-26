import React, { Fragment } from "react";
import RegisterForm from "../components/RegisterForm";

const Register = ({ setAuth }) => {
  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-center'>
        <RegisterForm setAuth={setAuth}></RegisterForm>
      </div>
    </div>
  );
};

export default Register;
