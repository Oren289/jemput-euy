import React, { useState } from "react";

const LaporForm = () => {
  const [inputs, setInputs] = useState({
    nama_pelapor: "",
    nomor_kontak: "",
    deskripsi: "",
    jenis_aduan: "default",
  });

  const { nama_pelapor, nomor_kontak, deskripsi, jenis_aduan } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { nama_pelapor, nomor_kontak, deskripsi, jenis_aduan };

      const response = await fetch("http://localhost:5000/lapor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      setInputs({ nama_pelapor: "", nomor_kontak: "", deskripsi: "", jenis_aduan: "" });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='card shadow'>
      <div className='card-header'>
        <div className='row'>
          <h3 class='fw-bold mb-0'>Form Aduan</h3>
        </div>
      </div>
      <div className='card-body'>
        <form onSubmit={onSubmitHandler} method='POST'>
          <div className='row mb-3'>
            <div className='col-md-4 text-end align-text-center'>
              <label htmlFor='nama_pelapor'>Nama Pelapor</label>
            </div>
            <div className='col-md-8'>
              <input type='text' className='form-control no-outline' name='nama_pelapor' value={nama_pelapor} onChange={(e) => onChange(e)} required />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end align-text-center'>
              <label htmlFor='nomor_kontak'>Nomor Kontak</label>
            </div>
            <div className='col-md-8'>
              <input type='text' className='form-control no-outline' name='nomor_kontak' value={nomor_kontak} onChange={(e) => onChange(e)} required />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end'>
              <label htmlFor='deskripsi'>Deskripsi</label>
            </div>
            <div className='col-md-8'>
              <textarea name='deskripsi' className='form-control no-outline' id='deskripsi' cols='30' rows='5' value={deskripsi} onChange={(e) => onChange(e)} required></textarea>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end'>
              <label htmlFor='foto_aduan'>Foto</label>
            </div>
            <div className='col-md-8'>
              <input type='file' name='foto_aduan' className='form-control no-outline' accept='image/*' />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end'>
              <label htmlFor='jenis_aduan'>Jenis aduan</label>
            </div>
            <div className='col-md-8'>
              <select name='jenis_aduan' id='jenis_aduan' className='form-control no-outline' value={jenis_aduan} onChange={(e) => onChange(e)} required>
                <option value='default' disabled hidden selected>
                  Pilih jenis aduan
                </option>
                <option value='sapuan jalan'>Sapuan jalan</option>
                <option value='tumpukkan sampah'>Tumpukkan sampah</option>
                <option value='pembakaran sampah'>Pembakaran sampah</option>
                <option value='taman'>Taman</option>
                <option value='tps'>TPS</option>
                <option value='pengangkutan'>Pengangkutan</option>
                <option value='komersial dan kemitraan'>Komersian dan kemitraan</option>
                <option value='lainnya'>Lainnya</option>
              </select>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-md-4'></div>
            <div className='col-md-8 text-end'>
              <input className='me-2' type='checkbox' id='validasi_data_pengguna' name='validasi_data_pengguna' value='valid' />
              <label className='me-5' htmlFor='validasi_data_pengguna'>
                Data yang saya ajukan adalah benar
              </label>
              <button className='btn btn-info'>Submit Aduan</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LaporForm;
