import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardFinder from "../apis/DashboardFinder";
import Jumbotron from "../components/Jumbotron";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/UserContext";

const Dashboard = ({ setAuth }) => {
  // const { username, getUsername } = useContext(UserContext);
  const [username, setUsername] = useState("");

  const getUsername = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setUsername(parseRes.username_pengguna);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    if (!localStorage.token) {
      toast.info("Berhasil logout!");
    }
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <Fragment>
      <Navbar username={username} logout={logout}></Navbar>
      <Jumbotron></Jumbotron>
    </Fragment>
  );
};

export default Dashboard;
