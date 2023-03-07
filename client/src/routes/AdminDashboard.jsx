import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='admin-container'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={isOpen ? "admin-body" : "admin-body-closed"}>
        <AdminNavbar />
        <h3>Admin Dashboard</h3>
      </div>
    </div>
  );
};

export default AdminDashboard;
