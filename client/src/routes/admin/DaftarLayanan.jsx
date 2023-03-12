import React, { useContext, useEffect, useMemo, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Sidebar from "../../components/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const DaftarLayanan = ({ isOpen, setIsOpen }) => {
  const [layanan, setLayanan] = useState([]);

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

  const columns = [
    { field: "urutan", headerName: "Urutan", width: 70 },
    { field: "id_permintaan", headerName: "Req. ID", width: 200, sortable: false },
    { field: "tanggal_diterima", headerName: "Tgl. Diterima", width: 110, renderCell: (params) => moment(params.row.tanggal_diterima).format("YYYY-MM-DD") },
    {
      field: "username_pengguna",
      headerName: "Username Pemohon",
      width: 90,
    },
    {
      field: "nama_pemohon",
      headerName: "Nama Pemohon",
      width: 200,
    },
    {
      field: "no_hp_pemohon",
      headerName: "No. Hp",
      width: 120,
      sortable: false,
    },
    {
      field: "alamat_kecamatan",
      headerName: "Kecamatan",
      width: 120,
    },
    {
      field: "jumlah_sampah",
      headerName: "Jml. Sampah",
      type: "number",
      width: 110,
    },
    {
      field: "status_layanan",
      headerName: "Status",
      width: 150,
    },
    {
      field: "aksi",
      headerName: "Aksi",
      sortable: false,
      filterable: false,
      width: 132,
      renderCell: (params) => {
        return (
          <div>
            <IconButton aria-label='edit'>
              <EditIcon />
            </IconButton>
            <IconButton aria-label='delete' color='error'>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getLayanan();
  }, []);

  return (
    <div className='admin-container'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={isOpen ? "admin-body" : "admin-body-closed"}>
        <AdminNavbar />
        <div className='admin-content'>
          <h2 className='mb-4'>Daftar Permintaan Layanan</h2>
          <div className='shadow-sm' style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={layanan}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.id_permintaan}
              sx={{
                "& .MuiDataGrid-row": {
                  "&:nth-of-type(even)": { backgroundColor: "rgba(235, 235, 235, .7)" },
                },
                "& .MuiDataGrid-columnHeadersInner": {
                  backgroundColor: "#205295",
                  color: "whitesmoke",
                  "& .MuiSvgIcon-root": {
                    color: "whitesmoke",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarLayanan;
