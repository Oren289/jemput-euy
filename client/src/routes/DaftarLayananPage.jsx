import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { LayananContext } from "../context/LayananContext";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpensOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const DaftarLayananPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { layanan, setLayanan } = useContext(LayananContext);

  const getLayanan = async () => {
    try {
      const response = await fetch("http://localhost:5000/layanan/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setLayanan(parseRes.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getLayanan();
  }, []);

  return (
    <div className='admin-container'>
      <SideBar></SideBar>
      <div className='content'>
        <TopBar></TopBar>
        <div className='container mt-md-5'>
          <Header title='DASHBOARD' subtitle='Selamat datang di dashboard' />
        </div>
      </div>
    </div>
  );
};

export default DaftarLayananPage;
