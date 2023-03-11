import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = ({ isOpen, setIsOpen }) => {
  return (
    <div className='admin-container'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={isOpen ? "admin-body" : "admin-body-closed"}>
        <AdminNavbar />
        <div className='admin-content'>
          <h2>Admin Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
