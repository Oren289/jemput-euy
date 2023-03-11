import React, { useContext, useEffect } from "react";
import LaporForm from "../components/LaporForm";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const Lapor = ({ logout }) => {
  const { username, getUsername } = useContext(UserContext);

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <div>
      <Navbar username={username} logout={logout}></Navbar>
      <div className='container px-md-5 mt-5'>
        <LaporForm></LaporForm>
      </div>
    </div>
  );
};

export default Lapor;
