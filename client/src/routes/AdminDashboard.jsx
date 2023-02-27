import React from "react";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

const AdminDashboard = () => {
  return (
    <div className='admin-dashboard'>
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

export default AdminDashboard;
