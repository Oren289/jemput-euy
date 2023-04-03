import Home from "@mui/icons-material/Home";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";
import Sidebar from "../../components/Sidebar";
import Select from "react-select";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";

const DetailLayanan = ({ isOpen, setIsOpen }) => {
  const [dataLayanan, setDataLayanan] = useState({});
  const [dataSampah, setDataSampah] = useState([]);
  const [statusLayanan, setStatusLayanan] = useState({ value: "" });
  const id = useParams();

  const navigate = useNavigate();

  const getDataLayanan = async () => {
    try {
      const response = await fetch(`http://localhost:5000/layanan/${id.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setDataLayanan(parseRes.data[0]);
      setStatusLayanan({ value: parseRes.data[0].status_layanan, label: parseRes.data[0].status_layanan });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getJenisSampah = async () => {
    try {
      const response = await fetch(`http://localhost:5000/layanan/jenis-sampah/${id.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setDataSampah(parseRes.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/layanan/ganti-status/${id.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(statusLayanan),
      });

      const parseRes = await response.json();
      toast.success("Data berhasil diperbarui!");
      navigate("/admin-daftar-layanan");
    } catch (error) {
      console.error(error.message);
    }
  };

  const selectOptions = [
    { value: "Menunggu proses review", label: "Menunggu proses review" },
    { value: "Menunggu penjemputan", label: "Menunggu penjemputan" },
    { value: "Selesai", label: "Selesai" },
    { value: "Ditolak", label: "Ditolak" },
  ];

  const selectStyle = {
    control: (styles, { isFocused }) => {
      return { ...styles, borderColor: isFocused ? "#362fd9" : "#CBCBCB", outline: "none", padding: "0.2rem", borderRadius: "0.3em", boxShadow: "none" };
    },
  };

  useEffect(() => {
    getDataLayanan();
    getJenisSampah();
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
            <Link underline='hover' color='inherit' href='/admin-daftar-layanan'>
              Daftar Layanan
            </Link>
            <Typography color='text.primary'>Detail Layanan ({dataLayanan.nama_pemohon})</Typography>
          </Breadcrumbs>
          <h2 className='mb-3 mt-2'>Detail Layanan</h2>
          <div class='card'>
            <div class='card-body'>
              <div className='d-flex justify-content-between align-item-center'>
                <h5 class='card-title'>Id: {dataLayanan.id_permintaan}</h5>
                <h5 class='card-title'>Urutan: {dataLayanan.urutan}</h5>
              </div>
              <hr />
              <div className='row'>
                <div className='col-lg-5'>
                  <div className='card max-height-col'>
                    <div className='card-header pb-0'>
                      <h6>Detail Pemohon</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row mb-3'>
                        <div className='col-4'>Nama Pemohon</div>
                        <div className='col'>{dataLayanan.nama_pemohon}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Username Pemohon</div>
                        <div className='col'>{dataLayanan.username_pengguna}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>No. Hp Pemohon</div>
                        <div className='col'>{dataLayanan.no_hp_pemohon}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Kecamatan</div>
                        <div className='col'>{dataLayanan.alamat_kecamatan}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Kelurahan</div>
                        <div className='col'>{dataLayanan.alamat_kelurahan}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Keterangan</div>
                        <div className='col'>{dataLayanan.alamat_ket_tambahan}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='card max-height-col'>
                    <div className='card-header pb-0'>
                      <h6>Detail Permohonan</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row mb-3'>
                        <div className='col-4'>Kecamatan</div>
                        <div className='col'>{dataLayanan.alamat_kecamatan}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Kelurahan</div>
                        <div className='col'>{dataLayanan.alamat_kelurahan}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Keterangan</div>
                        <div className='col'>{dataLayanan.alamat_ket_tambahan}</div>
                      </div>
                      <hr />
                      <div className='row mb-3'>
                        <div className='col-4'>Jumlah Sampah</div>
                        <div className='col'>{dataLayanan.jumlah_sampah}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Jenis Sampah</div>
                        <div className='col d-flex'>
                          {dataSampah.map((item) => {
                            return (
                              <div key={item.index} className='badge text-bg-secondary me-1 d-flex align-items-center'>
                                {item.sampah}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Keterangan</div>
                        <div className='col'>{dataLayanan.keterangan_tambahan}</div>
                      </div>
                      <hr />
                      <div className='row mb-3'>
                        <div className='col-4'>Tanggal Diterima</div>
                        <div className='col'>{moment(dataSampah.tanggal_diterima).format("YYYY-MM-DD")}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Tanggal Selesai</div>
                        <div className='col'>{dataLayanan.tanggal_selesai !== null ? moment(dataLayanan.tanggal_diterima).format("YYYY-MM-DD") : "-"}</div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-4'>Penanggungjawab</div>
                        <div className='col'>{dataLayanan.username_petugas !== null ? dataLayanan.username_petugas : <div className='text-danger'>belum ditetapkan</div>}</div>
                      </div>
                      <form onSubmit={(e) => onSubmitHandler(e)}>
                        <div className='row mb-3'>
                          <div className='col-4'>Status Layanan</div>
                          <div className='col d-flex align-items-center'>
                            <div className='col'>
                              <Select className='basic-single me-2' classNamePrefix='select' value={statusLayanan} name='statusLayanan' options={selectOptions} onChange={(item) => setStatusLayanan(item)} />
                            </div>
                            <div className='col-2'>
                              <button className='btn btn-info d-flex align-items-center'>
                                <SaveIcon></SaveIcon>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='d-flex justify-content-end'></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLayanan;
