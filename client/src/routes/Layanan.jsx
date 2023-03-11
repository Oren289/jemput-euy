import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayananForm from "../components/LayananForm";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const Layanan = ({ logout }) => {
  const navigate = useNavigate();
  const { username, getUsername } = useContext(UserContext);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();

      if (parseRes !== true) {
        console.log("test");
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUsername();
    checkAuth();
  }, []);

  return (
    <div>
      <Navbar logout={logout} username={username}></Navbar>
      <div className='container px-md-5 mt-5'>
        <LayananForm></LayananForm>
      </div>
    </div>
  );
};

export default Layanan;
