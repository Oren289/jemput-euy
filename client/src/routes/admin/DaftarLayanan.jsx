import React, { useContext, useEffect, useMemo, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Sidebar from "../../components/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Home from "@mui/icons-material/Home";
import { Breadcrumbs, IconButton, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DaftarLayanan = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

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

  const deleteLayanan = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:5000/layanan/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setLayanan(layanan.filter((layanan) => layanan.id_permintaan != id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const columns = [
    { field: "urutan", headerName: "Urutan", width: 70 },
    { field: "id_permintaan", headerName: "Req. ID", width: 300, sortable: false },
    { field: "tanggal_diterima", headerName: "Tgl. Diterima", width: 110, renderCell: (params) => moment(params.row.tanggal_diterima).format("YYYY-MM-DD") },
    {
      field: "username_pengguna",
      headerName: "Username Pemohon",
      width: 120,
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
      renderCell: (params) => {
        if (params.row.status_layanan === "Menunggu proses review") {
          return <div className='badge text-bg-warning'>{params.row.status_layanan}</div>;
        } else if (params.row.status_layanan === "Menunggu penjemputan") {
          return <div className='badge text-bg-info'>{params.row.status_layanan}</div>;
        } else if (params.row.status_layanan === "Selesai") {
          return <div className='badge text-bg-success'>{params.row.status_layanan}</div>;
        } else {
          return <div className='badge text-bg-danger'>{params.row.status_layanan}</div>;
        }
      },
    },
    {
      field: "aksi",
      headerName: "Aksi",
      sortable: false,
      filterable: false,
      width: 90,
      renderCell: (params) => {
        return (
          <div>
            <IconButton aria-label='edit' onClick={() => navigate(`/admin-detail-layanan/${params.row.id_permintaan}`)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label='delete' color='error'>
              <DeleteIcon onClick={(e) => deleteLayanan(e, params.row.id_permintaan)} />
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
          <Breadcrumbs aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/admin-dashboard'>
              <Home></Home>
            </Link>
            <Typography color='text.primary'>Daftar Layanan</Typography>
          </Breadcrumbs>
          <h2 className='mb-3 mt-2'>Daftar Permintaan Layanan</h2>
          <div className='shadow-sm' style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={layanan}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.id_permintaan}
              sx={{
                "& .MuiDataGrid-root": {
                  backgroundColor: "#f6f6f6",
                },
                "& .MuiDataGrid-row": {
                  "&:nth-of-type(even)": { backgroundColor: "rgba(222, 222, 222, .7)" },
                  "&:hover": { backgroundColor: "rgba(215, 215, 215, .7)" },
                },
                "& .MuiDataGrid-columnHeaders": {
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
