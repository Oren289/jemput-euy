import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import { useLoadScript } from '@react-google-maps/api';
import Map from './Map';

const libraries = ['places'];

const LayananForm = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyDCzjmZxIrRDVlC4L_JPUC8VXl43LNC2qQ', libraries });
  const navigate = useNavigate();
  const animatedComponent = makeAnimated();

  const options = [
    { value: 'Andir', label: 'Andir' },
    { value: 'Antapani (Cicadas)', label: 'Antapani (Cicadas)' },
    { value: 'Arcamanik', label: 'Arcamanik' },
    { value: 'Astana Anyar', label: 'Astana Anyar' },
    { value: 'Babakan Ciparay', label: 'Babakan Ciparay' },
    { value: 'Bandung Kidul', label: 'Bandung Kidul' },
    { value: 'Bandung Kulon', label: 'Bandung Kulon' },
    { value: 'Bandung Wetan', label: 'Bandung Wetan' },
    { value: 'Batununggal', label: 'Batununggal' },
    { value: 'Bojongloa Kaler', label: 'Bojongloa Kaler' },
    { value: 'Bojongloa Kidul', label: 'Bojongloa Kidul' },
    { value: 'Buahbatu (Margacinta)', label: 'Buahbatu (Margacinta)' },
    { value: 'Cibeunying Kaler', label: 'Cibeunying Kaler' },
    { value: 'Cibeunying Kidul', label: 'Cibeunying Kidul' },
    { value: 'Cibiru', label: 'Cibiru' },
    { value: 'Cicendo', label: 'Cicendo' },
    { value: 'Cidadap', label: 'Cidadap' },
    { value: 'Cinambo', label: 'Cinambo' },
    { value: 'Coblong', label: 'Coblong' },
    { value: 'Gedebage', label: 'Gedebage' },
    { value: 'Kiaracondong', label: 'Kiaracondong' },
    { value: 'Lengkong', label: 'Lengkong' },
    { value: 'Mandalajati', label: 'Mandalajati' },
    { value: 'Panyileukan', label: 'Panyileukan' },
    { value: 'Rancasari', label: 'Rancasari' },
    { value: 'Regol', label: 'Regol' },
    { value: 'Sukajadi', label: 'Sukajadi' },
    { value: 'Sukasari', label: 'Sukasari' },
    { value: 'Sumur Bandung', label: 'Sumur Bandung' },
    { value: 'Ujung Berung', label: 'Ujung Berung' },
  ];

  const options2 = [
    { value: 'Kasur', label: 'Kasur' },
    { value: 'Springbed', label: 'Springbed' },
    { value: 'Kursi', label: 'Kursi' },
    { value: 'Meja', label: 'Meja' },
    { value: 'Elektronik', label: 'Elektronik' },
    { value: 'Lainnya', label: 'Lainnya' },
  ];

  const selectStyle = {
    control: (styles, { isFocused }) => {
      return { ...styles, borderColor: isFocused ? '#362fd9' : '#CBCBCB', outline: 'none', padding: '0.2rem', borderRadius: '0.3em', boxShadow: 'none' };
    },
  };

  const { userData, setUserData, userAddress, setUserAddress, getUserAddress } = useContext(UserContext);

  const [nama, setNama] = useState('');
  const [noHp, setNoHp] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [keteranganAlamat, setKeteranganAlamat] = useState('');
  const [jumlahSampah, setJumlahSampah] = useState(1);
  const [jenisSampah, setJenisSampah] = useState('');
  const [keteranganTambahan, setKeteranganTambahan] = useState('');
  const [coordinate, setCoordinate] = useState({ lat: '', lng: '' });

  const [addressCheckBox, setAddressCheckBox] = useState(false);

  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/', {
        method: 'GET',
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setNama(parseRes.nama_depan_pengguna + ' ' + parseRes.nama_belakang_pengguna);
      setNoHp(parseRes.no_hp_pengguna);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onCheckboxChange = () => {
    setAddressCheckBox(!addressCheckBox);
    if (!addressCheckBox) {
      const latitude = parseFloat(userAddress.latitude);
      const longitude = parseFloat(userAddress.longitude);
      setKecamatan({ value: userAddress.kecamatan, label: userAddress.kecamatan });
      setKelurahan(userAddress.kelurahan);
      setKeteranganAlamat(userAddress.keterangan_alamat);
      setCoordinate({ lat: latitude, lng: longitude });
    } else {
      setKecamatan('');
      setKelurahan('');
      setKeteranganAlamat('');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (nama === '' || noHp === '' || kecamatan === '' || kelurahan === '' || keteranganAlamat === '' || jenisSampah === '' || coordinate.lat === '') {
        return toast.error('Mohon lengkapi formulir terlebih dahulu!');
      }

      const valueKecamatan = kecamatan.value;
      const body = { nama, noHp, valueKecamatan, kelurahan, keteranganAlamat, jumlahSampah, jenisSampah, keteranganTambahan, coordinate };

      const response = await fetch('http://localhost:5000/layanan/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.status) {
        toast.success('Permohonan berhasil dikirim!');
        setJumlahSampah(1);
        setJenisSampah('');
        setKeteranganTambahan('');
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

  useEffect(() => {
    getUserAddress();
    getUserData();
  }, []);

  const onChangeHandler = (item) => {
    setKecamatan(item);
    console.log(kecamatan);
  };

  return (
    <div className='card shadow'>
      <div className='card-header'>
        <div className='row'>
          <h3 className='fw-bold mb-0'>Form Pendaftaran Layanan</h3>
        </div>
      </div>
      <div className='card-body'>
        <form onSubmit={onSubmitHandler} method='POST'>
          <div className='row mb-3'>
            <div className='col-md-4 text-end align-text-center'>
              <label htmlFor='nama'>Nama</label>
            </div>
            <div className='col-md-8'>
              <input type='text' className='form-control no-outline' name='nama' value={nama} onChange={(e) => setNama(e.target.value)} placeholder='Masukkan nama anda' required />
            </div>
          </div>
          <div className='row mb-5'>
            <div className='col-md-4 text-end align-text-center'>
              <label htmlFor='no_hp'>No handphone aktif</label>
            </div>
            <div className='col-md-8'>
              <input type='text' className='form-control no-outline' name='no_hp' value={noHp} onChange={(e) => setNoHp(e.target.value)} placeholder='Masukkan nomor yang dapat dihubungi' required />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end'>
              <label htmlFor='alamat'>Alamat</label>
            </div>
            <div className='col-md-8'>
              <Select options={options} styles={selectStyle} placeholder='Pilih kecamatan...' value={kecamatan} onChange={(item) => onChangeHandler(item)} isClearable required></Select>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end'></div>
            <div className='col-md-8'>
              <input type='text' className='form-control no-outline' name='kelurahan' value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} placeholder='Masukkan nama kelurahan' required />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end'></div>
            <div className='col-md-8'>
              <textarea
                name='alamat'
                className='form-control no-outline'
                id='alamat'
                cols='30'
                rows='5'
                value={keteranganAlamat}
                onChange={(e) => setKeteranganAlamat(e.target.value)}
                placeholder='Masukkan nama jalan, nomor rumah, patokan, atau keterangan lainnya'
                required
              ></textarea>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end'></div>
            <div className='col-md-8'>{!isLoaded ? <div>Loading...</div> : <Map coordinate={coordinate} setCoordinate={setCoordinate}></Map>}</div>
          </div>
          <div className='row mb-5'>
            <div className='col-md-4 text-end'></div>
            <div className='col-md-8'>
              <input type='checkbox' name='useCurrentAddress' id='useCurrentAddress' value={addressCheckBox} onChange={onCheckboxChange} />
              <label htmlFor='useCurrentAddress' className='ms-2'>
                Gunakan alamat saya
              </label>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end'>
              <label htmlFor='alamat'>Jumlah sampah</label>
            </div>
            <div className='col-md-8'>
              <input
                type='number'
                min={1}
                max={2}
                className='form-control no-outline'
                name='jumlah_sampah'
                value={jumlahSampah}
                onChange={(e) => (e.target.value > 2 ? setJumlahSampah(2) : setJumlahSampah(e.target.value))}
                placeholder='Masukkan jumlah sampah besar'
                required
              />
              <div id='jumlahSampahHelp' className='form-text'>
                Jumlah maksimal sampah besar yang dapat diangkut adalah 2 buah.
              </div>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end'>
              <label htmlFor='alamat'>Jenis sampah (max. 2)</label>
            </div>
            <div className='col-md-8'>
              <Select
                options={options2}
                styles={selectStyle}
                components={animatedComponent}
                value={jenisSampah}
                onChange={(item) => setJenisSampah(item)}
                isOptionDisabled={() => jenisSampah.length >= 2}
                isMulti
                placeholder='Pilih maksimal 2 jenis sampah besar...'
                required
              ></Select>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-4 text-end'>
              <label htmlFor='keterangan_jenis_sampah_lainnya'>Keterangan tambahan (jika ada)</label>
            </div>
            <div className='col-md-8'>
              <textarea
                name='keterangan_jenis_sampah_lainnya'
                className='form-control no-outline'
                id='keterangan_jenis_sampah_lainnya'
                cols='30'
                rows='2'
                placeholder='Masukkan keterangan tambahan mengenai sampah besar anda'
                value={keteranganTambahan}
                onChange={(e) => setKeteranganTambahan(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-md-4'></div>
            <div className='col-md-8 text-end'>
              <input className='me-2' type='checkbox' id='validasi_data_pengguna' name='validasi_data_pengguna' value='valid' required />
              <label className='me-5' htmlFor='validasi_data_pengguna'>
                Data yang saya ajukan adalah benar
              </label>
              <button className='btn btn-info'>Ajukan</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LayananForm;
