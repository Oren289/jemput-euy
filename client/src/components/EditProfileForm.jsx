import React, { useEffect, useState } from "react";
import dropdownImg from "../images/blank-pp.png";
import { toast } from "react-toastify";

const EditProfileForm = ({ userData }) => {
  const { username_pengguna, email_pengguna } = userData;

  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");

  const [kecamatan, setKecamatan] = useState("Pilih kecamatan di Kota Bandung");
  const [kelurahan, setKelurahan] = useState("");
  const [keteranganAlamat, setKeteranganAlamat] = useState("");

  const [newPass, setNewPass] = useState("");
  const [retypePass, setRetypePass] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");

  const [redOutline, setRedOutline] = useState("");
  const [disabledBtn, setDisabledBtn] = useState("disabled");

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setNamaDepan(parseRes.nama_depan_pengguna);
      setNamaBelakang(parseRes.nama_belakang_pengguna);
      setEmail(parseRes.email_pengguna);
      setNoHp(parseRes.no_hp_pengguna);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAddressData = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/address", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setKecamatan(parseRes.kecamatan);
      setKelurahan(parseRes.kelurahan);
      setKeteranganAlamat(parseRes.keterangan_alamat);
    } catch (error) {
      console.error(error.message);
    }
  };

  const functions = () => {
    const myAccountPill = document.getElementById("my-account-pill");
    const myAccountCard = document.getElementById("my-account-card");

    const myAddressPill = document.getElementById("my-address-pill");
    const myAddressCard = document.getElementById("my-address-card");

    const changePasswordPill = document.getElementById("change-password-pill");
    const changePasswordCard = document.getElementById("change-password-card");

    myAccountPill.addEventListener("click", (e) => {
      myAccountPill.classList.remove("active-pill");
      myAddressPill.classList.remove("active-pill");
      changePasswordPill.classList.remove("active-pill");
      myAccountPill.classList.add("active-pill");

      myAccountCard.classList.remove("d-none");
      myAddressCard.classList.remove("d-none");
      changePasswordCard.classList.remove("d-none");
      myAddressCard.classList.add("d-none");
      changePasswordCard.classList.add("d-none");
    });

    myAddressPill.addEventListener("click", (e) => {
      myAccountPill.classList.remove("active-pill");
      myAddressPill.classList.remove("active-pill");
      changePasswordPill.classList.remove("active-pill");
      myAddressPill.classList.add("active-pill");

      myAccountCard.classList.remove("d-none");
      myAddressCard.classList.remove("d-none");
      changePasswordCard.classList.remove("d-none");
      myAccountCard.classList.add("d-none");
      changePasswordCard.classList.add("d-none");
    });

    changePasswordPill.addEventListener("click", (e) => {
      myAccountPill.classList.remove("active-pill");
      myAddressPill.classList.remove("active-pill");
      changePasswordPill.classList.remove("active-pill");
      changePasswordPill.classList.add("active-pill");

      myAccountCard.classList.remove("d-none");
      myAddressCard.classList.remove("d-none");
      changePasswordCard.classList.remove("d-none");
      myAddressCard.classList.add("d-none");
      myAccountCard.classList.add("d-none");
    });
  };

  const onUserSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { username_pengguna, namaDepan, namaBelakang, email, noHp };

      const response = await fetch("http://localhost:5000/user/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.status) {
        toast.success("Data pengguna berhasil diperbarui");
      } else {
        toast.error(parseRes.error);
      }

      if (parseRes.errors) {
        parseRes.errors.forEach((error) => {
          toast.error(error.msg);
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onAddressSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { kecamatan, kelurahan, keteranganAlamat };

      const response = await fetch("http://localhost:5000/user/address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.status) {
        toast.success("Data alamat berhasil diperbarui");
      } else {
        toast.error(parseRes.error);
      }

      if (parseRes.errors) {
        parseRes.errors.forEach((error) => {
          toast.error(error.msg);
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const onRetypePassChange = (e) => {
    const newRetypePass = e.target.value;
    setRetypePass(e.target.value);

    if (newRetypePass !== newPass) {
      setPassErrorMsg("Password tidak cocok!");
      setRedOutline("red-outline");
      setDisabledBtn("disabled");
    } else if (newRetypePass === newPass) {
      setPassErrorMsg("");
      setRedOutline("");
      setDisabledBtn("");
    }
  };

  const onNewPassSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPass === "") {
        return toast.error("Password tidak boleh kosong!");
      }

      if (newPass !== retypePass) {
        return toast.error("Password tidak cocok!");
      }

      const body = { newPass };

      const response = await fetch("http://localhost:5000/user/changepassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (parseRes.status) {
        toast.success("Password berhasil diperbarui");
        setNewPass("");
        setRetypePass("");
        setRedOutline("disabled");
      } else {
        toast.error("Password baru tidak boleh sama dengan yang lama!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
    getAddressData();
    functions();
  }, []);

  return (
    <div>
      <div className='card shadow text-center'>
        <div className='card-header'>
          <ul className='nav nav-pills card-header-pills' id='navigationPills'>
            <li className='nav-item active-pill' id='my-account-pill'>
              <a className='btn nav-link no-margin text-light' href='#'>
                Akun saya
              </a>
            </li>
            <li className='nav-item' id='my-address-pill'>
              <a className='nav-link no-margin text-light' href='#'>
                Alamat saya
              </a>
            </li>
            <li className='nav-item' id='change-password-pill'>
              <a className='nav-link no-margin text-light' href='#'>
                Ganti password
              </a>
            </li>
          </ul>
        </div>
        <div className='card-body' id='my-account-card'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='card p-4 shadow-sm'>
                <img className='rounded-circle' src={dropdownImg} alt='userpp' id='my-acc-profile-pic' />
                <button type='submit' className='btn btn-info mt-5'>
                  Ganti foto profil
                </button>
              </div>
            </div>
            <div className='col text-start'>
              <h3 className='fw-bold' id='myaccountTitle'>
                Akun Saya
              </h3>
              <form onSubmit={onUserSubmitHandler} method='POST'>
                <div className='row mt-4'>
                  <div className='col-md-3'>
                    <label htmlFor='myaccount-username' className='col-form-label'>
                      Username
                    </label>
                  </div>
                  <div className='col'>
                    <input type='text' id='myaccount-username' className='form-control' name='username' disabled value={username_pengguna} required />
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-3'>
                    <label htmlFor='nama_depan' className='col-form-label'>
                      Nama depan
                    </label>
                  </div>
                  <div className='col'>
                    <input type='text' id='nama_depan' className='form-control no-outline' name='nama_depan' value={namaDepan} onChange={(e) => setNamaDepan(e.target.value)} required />
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-3'>
                    <label htmlFor='nama_belakang' className='col-form-label'>
                      Nama belakang
                    </label>
                  </div>
                  <div className='col'>
                    <input type='text' id='nama_belakang' className='form-control no-outline' name='nama_belakang' value={namaBelakang} onChange={(e) => setNamaBelakang(e.target.value)} required />
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-3'>
                    <label htmlFor='myaccount-email' className='col-form-label'>
                      Email
                    </label>
                  </div>
                  <div className='col'>
                    <input type='text' id='myaccount-email' className='form-control no-outline' name='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                    <div id='emailHelp' className='form-text text-danger'></div>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-3'>
                    <label htmlFor='myaccount-birthdate' className='col-form-label'>
                      No Handphone
                    </label>
                  </div>
                  <div className='col'>
                    <input atype='text' id='myaccount-birthdate' className='form-control no-outline' name='dateofbirth' value={noHp} onChange={(e) => setNoHp(e.target.value)} />
                  </div>
                </div>
                <div className='d-flex justify-content-end mt-4'>
                  <button className='btn btn-info' type='submit'>
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='card-body d-none text-start' id='my-address-card'>
          <h3 className='fw-bold'>Alamat Saya</h3>
          <form method='POST' onSubmit={onAddressSubmitHandler}>
            <div className='row mt-4  '>
              <div className='col-md-3'>
                <label htmlFor='kecamatan' className='col-form-label'>
                  Kecamatan
                </label>
              </div>
              <div className='col'>
                <select name='kecamatan' id='kecamatan' className='form-control no-outline' value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} required>
                  <option value='Pilih kecamatan di Kota Bandung' hidden>
                    Pilih kecamatan di Kota Bandung
                  </option>
                  <option value='Andir'>Andir</option>
                  <option value='Antapani (Cicadas)'>Antapani (Cicadas)</option>
                  <option value='Arcamanik'>Arcamanik</option>
                  <option value='Astana Anyar'>Astana Anyar</option>
                  <option value='Babakan Ciparay'>Babakan ciparay</option>
                  <option value='Bandung Kidul'>Bandung kidul</option>
                  <option value='Bandung Kulon'>Bandung kulon</option>
                  <option value='Bandung Wetan'>Bandung wetan</option>
                  <option value='Batununggal'>Batununggal</option>
                  <option value='Bojongloa Kaler'>Bojongloa Kaler</option>
                  <option value='Bojongloa Kidul'>Bojongloa Kidul</option>
                  <option value='Buahbatu (Margacinta)'>Buahbatu (Margacinta)</option>
                  <option value='Cibeunying Kaler'>Cibeunying Kaler</option>
                  <option value='Cibeunying Kidul'>Cibeunying Kidul</option>
                  <option value='Cibiru'>Cibiru</option>
                  <option value='Cicendo'>Cicendo</option>
                  <option value='Cidadap'>Cidadap</option>
                  <option value='Cinambo'>Cinambo</option>
                  <option value='Coblong'>Coblong</option>
                  <option value='Gedebage'>Gedebage</option>
                  <option value='Kiaracondong'>Kiaracondong</option>
                  <option value='Lengkong'>Lengkong</option>
                  <option value='Mandalajati'>Mandalajati</option>
                  <option value='Panyileukan'>Panyileukan</option>
                  <option value='Rancasari'>Rancasari</option>
                  <option value='Regol'>Regol</option>
                  <option value='Sukajadi'>Sukajadi</option>
                  <option value='Sukasari'>Sukasari</option>
                  <option value='Sumur Bandung'>Sumur Bandung</option>
                  <option value='Ujung Berung'>Ujung Berung</option>
                </select>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-3'>
                <label htmlFor='kecamatan' className='col-form-label'>
                  Kelurahan
                </label>
              </div>
              <div className='col'>
                <input type='text' className='form-control' name='kelurahan' placeholder='Masukkan nama kelurahan' value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} />
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-3'>
                <label htmlFor='keterangan_alamat' className='col-form-label'>
                  Keterangan Alamat
                </label>
              </div>
              <div className='col'>
                <textarea
                  name='keterangan_alamat'
                  className='form-control no-outline'
                  id='keterangan_alamat'
                  cols='30'
                  rows='5'
                  placeholder='Masukkan nama jalan, nomor rumah, patokan, atau keterangan lainnya'
                  value={keteranganAlamat}
                  onChange={(e) => setKeteranganAlamat(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className='d-flex justify-content-end mt-4'>
              <button className='btn btn-info' type='submit'>
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
        <div className='card-body d-none text-start' id='change-password-card'>
          <h3 className='fw-bold'>Ganti Password</h3>
          <form onSubmit={onNewPassSubmit} method='POST'>
            <div className='row mt-4'>
              <div className='col-md-3'>
                <label htmlFor='myaccount-new-password' className='col-form-label'>
                  Password baru
                </label>
              </div>
              <div className='col'>
                <input type='password' id='myaccount-new-password' className='form-control no-outline' name='newPass' autoComplete='new-password' value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                <div id='passwordHelp' className='form-text text-danger'></div>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-3'>
                <label htmlFor='myaccount-confirm-password' className='col-form-label'>
                  Konfirmasi password baru
                </label>
              </div>
              <div className='col'>
                <input type='password' id='myaccount-confirm-password' className={`form-control no-outline ${redOutline}`} name='confirm-password' autoComplete='new-password' value={retypePass} onChange={(e) => onRetypePassChange(e)} />
                <div id='confirmPasswordHelp' className='form-text text-danger'>
                  {passErrorMsg}
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-end mt-4'>
              <button className={`btn btn-info ${disabledBtn}`} type='submit'>
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
