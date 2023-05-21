import React, { useEffect, useState, PureComponent } from 'react';
import Sidebar from '../../components/Sidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import Home from '@mui/icons-material/Home';
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import CircleIcon from '@mui/icons-material/Circle';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import FooterAdmin from '../../components/FooterAdmin';

const Statistik = ({ isOpen, setIsOpen, logout }) => {
  const navigate = useNavigate();
  const [countLayananTotal, setCountLayananTotal] = useState(0);
  const [countLayananReview, setCountLayananReview] = useState(0);
  const [countLayananSelesai, setCountLayananSelesai] = useState(0);
  const [countLayananSelesaiBulanan, setCountLayananSelesaiBulanan] = useState(0);
  const [countLayananDitolakBulanan, setCountLayananDitolakBulanan] = useState(0);
  const [countLayananSelesaiTahunan, setCountLayananSelesaiTahunan] = useState(0);
  const [countLayananDitolakTahunan, setCountLayananDitolakTahunan] = useState(0);
  const [countLayananTunggu, setCountLayananTunggu] = useState(0);
  const [countLayananDijemput, setCountLayananDijemput] = useState(0);
  const [countLayananDitolak, setCountLayananDitolak] = useState(0);

  const [countJenisSampah, setCountJenisSampah] = useState({
    kasur: 0,
    springbed: 0,
    kursi: 0,
    meja: 0,
    elektronik: 0,
    lainnya: 0,
  });

  const [countJenisSampahBulanan, setCountJenisSampahBulanan] = useState({
    kasur: 0,
    springbed: 0,
    kursi: 0,
    meja: 0,
    elektronik: 0,
    lainnya: 0,
  });

  const [countJenisSampahTahunan, setCountJenisSampahTahunan] = useState({
    kasur: 0,
    springbed: 0,
    kursi: 0,
    meja: 0,
    elektronik: 0,
    lainnya: 0,
  });

  const currentMonth = moment().format('MMMM');
  const currentYear = moment().format('YYYY');

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: 'GET',
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();

      if (parseRes === 'Not Authorized') {
        console.log('test');
        navigate('/login');
      }

      if (parseRes.role === 'public' || parseRes.role === 'petugas') {
        navigate('/forbidden');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getCount = (data) => {
    let n = 0;
    data.forEach((item) => {
      ++n;
    });

    return n;
  };

  // const getJenisSampah = async () => {
  //   try {
  //     const responseSampah = await fetch(`http://localhost:5000/layanan/jenis-sampah`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         token: localStorage.token,
  //       },
  //     });

  //     const parseResSampah = await responseSampah.json();
  //     const sampahKasur = parseResSampah.data.filter((item) => item.sampah === 'Kasur');
  //     const sampahSpringbed = parseResSampah.data.filter((item) => item.sampah === 'Springbed');
  //     const sampahKursi = parseResSampah.data.filter((item) => item.sampah === 'Kursi');
  //     const sampahMeja = parseResSampah.data.filter((item) => item.sampah === 'Meja');
  //     const sampahElektronik = parseResSampah.data.filter((item) => item.sampah === 'Elektronik');
  //     const sampahLainnya = parseResSampah.data.filter((item) => item.sampah === 'Lainnya');

  //     setCountJenisSampah({
  //       kasur: getCount(sampahKasur),
  //       springbed: getCount(sampahSpringbed),
  //       kursi: getCount(sampahKursi),
  //       meja: getCount(sampahMeja),
  //       elektronik: getCount(sampahElektronik),
  //       lainnya: getCount(sampahLainnya),
  //     });
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const getLayanan = async () => {
    const response = await fetch('http://localhost:5000/layanan/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
    });

    const responseSampah = await fetch(`http://localhost:5000/layanan/jenis-sampah`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
    });

    const parseRes = await response.json();
    const parseResSampah = await responseSampah.json();

    const layananTotal = parseRes.data;
    const layananReview = parseRes.data.filter((item) => item.status_layanan === 'Menunggu proses review');
    const layananSelesai = parseRes.data.filter((item) => item.status_layanan === 'Selesai');
    const layananTunggu = parseRes.data.filter((item) => item.status_layanan === 'Menunggu penjemputan');
    const layananDijemput = parseRes.data.filter((item) => item.status_layanan === 'Sedang dijemput');
    const layananDitolak = parseRes.data.filter((item) => item.status_layanan === 'Ditolak');

    const sampahTotal = parseResSampah.data;
    const sampahKasur = parseResSampah.data.filter((item) => item.sampah === 'Kasur');
    const sampahSpringbed = parseResSampah.data.filter((item) => item.sampah === 'Springbed');
    const sampahKursi = parseResSampah.data.filter((item) => item.sampah === 'Kursi');
    const sampahMeja = parseResSampah.data.filter((item) => item.sampah === 'Meja');
    const sampahElektronik = parseResSampah.data.filter((item) => item.sampah === 'Elektronik');
    const sampahLainnya = parseResSampah.data.filter((item) => item.sampah === 'Lainnya');

    setCountJenisSampah({
      kasur: getCount(sampahKasur),
      springbed: getCount(sampahSpringbed),
      kursi: getCount(sampahKursi),
      meja: getCount(sampahMeja),
      elektronik: getCount(sampahElektronik),
      lainnya: getCount(sampahLainnya),
    });

    const layananSelesaiBulanan = [];
    const layananDitolakBulanan = [];
    const layananSelesaiTahunan = [];
    const layananDitolakTahunan = [];

    const idLayananCurrentMonth = [];

    const countKasurBulanan = 0;

    layananTotal.forEach((item) => {
      const bulanTanggalDiterima = moment(item.tanggal_diterima).format('MMMM');

      if (bulanTanggalDiterima === currentMonth) {
        idLayananCurrentMonth.push(item.id_permintaan);
      }
    });

    // idLayananCurrentMonth.forEach((id) => {
    //   sampahTotal.forEach((sampah) => {
    //     if(id === sampah.id_permintaan && sampah.sampah === 'Kasur'){

    //     }
    //   })
    // })

    const sampahSpringbedBulanan = sampahSpringbed.filter((item) => item.id_permintaan.includes('42e825f0-db6c-4111-a0a2-f6d13105ab23'));
    console.log(sampahSpringbedBulanan);

    // console.log(idLayananCurrentMonth);
    setCountJenisSampahBulanan({
      kasur: getCount(sampahKasur),
      springbed: getCount(sampahSpringbed),
      kursi: getCount(sampahKursi),
      meja: getCount(sampahMeja),
      elektronik: getCount(sampahElektronik),
      lainnya: getCount(sampahLainnya),
    });

    layananSelesai.forEach((item) => {
      const bulanTanggalDiterima = moment(item.tanggal_diterima).format('MMMM');

      if (bulanTanggalDiterima === currentMonth) {
        layananSelesaiBulanan.push(item);
      }
    });

    layananSelesai.forEach((item) => {
      const tahunTanggalDiterima = moment(item.tanggal_diterima).format('YYYY');

      if (tahunTanggalDiterima === currentYear) {
        layananSelesaiTahunan.push(item);
      }
    });

    layananDitolak.forEach((item) => {
      const bulanTanggalDiterima = moment(item.tanggal_diterima).format('MMMM');

      if (bulanTanggalDiterima === currentMonth) {
        layananDitolakBulanan.push(item);
      }
    });

    layananDitolak.forEach((item) => {
      const tahunTanggalDiterima = moment(item.tanggal_diterima).format('YYYY');

      if (tahunTanggalDiterima === currentYear) {
        layananDitolakTahunan.push(item);
      }
    });

    setCountLayananTotal(getCount(layananTotal));
    setCountLayananReview(getCount(layananReview));
    setCountLayananSelesai(getCount(layananSelesai));
    setCountLayananTunggu(getCount(layananTunggu));
    setCountLayananDijemput(getCount(layananDijemput));
    setCountLayananDitolak(getCount(layananDitolak));
    setCountLayananSelesaiBulanan(getCount(layananSelesaiBulanan));
    setCountLayananDitolakBulanan(getCount(layananDitolakBulanan));
    setCountLayananSelesaiTahunan(getCount(layananSelesaiTahunan));
    setCountLayananDitolakTahunan(getCount(layananDitolakTahunan));
  };

  const data = [
    { name: 'Selesai', value: countLayananSelesai },
    { name: 'Ditolak', value: countLayananDitolak },
  ];

  const dataBulanan = [
    { name: 'Selesai', value: countLayananSelesaiBulanan },
    { name: 'Ditolak', value: countLayananDitolakBulanan },
  ];

  const dataTahunan = [
    { name: 'Selesai', value: countLayananSelesaiTahunan },
    { name: 'Ditolak', value: countLayananDitolakTahunan },
  ];

  const dataSampah = [
    {
      name: 'Kasur',
      jumlah: countJenisSampah.kasur,
    },
    {
      name: 'Springbed',
      jumlah: countJenisSampah.springbed,
    },
    {
      name: 'Kursi',
      jumlah: countJenisSampah.kursi,
    },
    {
      name: 'Meja',
      jumlah: countJenisSampah.meja,
    },
    {
      name: 'Elektronik',
      jumlah: countJenisSampah.elektronik,
    },
    {
      name: 'Lainnya',
      jumlah: countJenisSampah.lainnya,
    },
  ];

  const COLORS = ['#14A44D', '#DC4C64'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    checkAuth();
    getLayanan();
  }, []);

  return (
    <div className='admin-container'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={isOpen ? 'admin-body' : 'admin-body-closed'}>
        <AdminNavbar logout={logout} />
        <div className='admin-content'>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/admin-dashboard'>
              <Home></Home>
            </Link>
            <Typography color='text.primary'>Statistik</Typography>
          </Breadcrumbs>
          <h2 className='mb-3 mt-2'>Statistik</h2>
          <div className='card'>
            <div className='card-header'>
              <h5 className='fw-bold mb-0'>Layanan Masuk</h5>
            </div>
            <div className='card-body d-grid'>
              <div className='row'>
                <div className='col pe-0'>
                  <div className='card-text-white bg-secondary'>
                    <div className='card-body'>
                      <Typography>Total Permintaan</Typography>
                      <h1 className='fw-bold mt-2 mb-0'>{countLayananTotal}</h1>
                    </div>
                  </div>
                </div>
                <div className='col pe-0'>
                  <div className='card-text-white bg-warning'>
                    <div className='card-body'>
                      <Typography>Belum Direview</Typography>
                      <h1 className='fw-bold mt-2 mb-0'>{countLayananReview}</h1>
                    </div>
                  </div>
                </div>
                <div className='col pe-0'>
                  <div className='card-text-white bg-info'>
                    <div className='card-body'>
                      <Typography>Menunggu...</Typography>
                      <h1 className='fw-bold mt-2 mb-0'>{countLayananTunggu}</h1>
                    </div>
                  </div>
                </div>
                <div className='col pe-0'>
                  <div className='card-text-white bg-primary'>
                    <div className='card-body'>
                      <Typography>Sedang Dijemput</Typography>
                      <h1 className='fw-bold mt-2 mb-0'>{countLayananDijemput}</h1>
                    </div>
                  </div>
                </div>
                <div className='col pe-0'>
                  <div className='card-text-white bg-success'>
                    <div className='card-body'>
                      <Typography>Selesai</Typography>
                      <h1 className='fw-bold mt-2 mb-0'>{countLayananSelesai}</h1>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='card-text-white bg-danger'>
                    <div className='card-body'>
                      <Typography>Ditolak</Typography>
                      <h1 className='fw-bold mt-2 mb-0'>{countLayananDitolak}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className='row'>
                <h5 className='fw-bold mb-0'>Visualisasi Data</h5>
                <div className='col d-flex flex-column'>
                  <PieChart width={300} height={300}>
                    <Pie data={data} cx='60%' cy='50%' labelLine={false} label={renderCustomizedLabel} outerRadius={120} fill='#8884d8' dataKey='value'>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className='d-flex justify-content-center'>Semua</div>
                </div>
                <div className='col d-flex flex-column justify-content-center'>
                  <PieChart width={300} height={300}>
                    <Pie data={dataBulanan} cx='60%' cy='50%' labelLine={false} label={renderCustomizedLabel} outerRadius={120} fill='#8884d8' dataKey='value'>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className='d-flex justify-content-center'>Bulanan</div>
                </div>
                <div className='col d-flex flex-column'>
                  <PieChart width={300} height={300}>
                    <Pie data={dataTahunan} cx='60%' cy='50%' labelLine={false} label={renderCustomizedLabel} outerRadius={120} fill='#8884d8' dataKey='value'>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className='d-flex justify-content-center'>Tahunan</div>
                </div>
              </div>
              <div className='row mt-4'>
                <div className='col d-flex justify-content-center align-items-center'>
                  <div className='d-flex align-items-center me-3'>
                    <span style={{ color: '#14A44D' }}>
                      <CircleIcon></CircleIcon>
                    </span>
                    Selesai
                  </div>
                  <div className='d-flex align-items-center'>
                    <span style={{ color: '#DC4C64' }}>
                      <CircleIcon></CircleIcon>
                    </span>
                    Ditolak
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card mt-5'>
            <div className='card-header'>
              <h5 className='fw-bold mb-0'>Sampah Terangkut</h5>
            </div>
            <div className='card-body d-grid'>
              <div className='row'>
                <div className='col'>
                  <div className='card-text-white bg-secondary'>
                    <div className='card-body'>
                      <Typography>Total Sampah Terangkut</Typography>
                      <h1 className='fw-bold mt-2 mb-0'>{countLayananTotal}</h1>
                      <hr />
                      <table>
                        <tr>
                          <td>Kasur</td>
                          <td>:</td>
                          <td className='ps-1'>{countJenisSampah.kasur}</td>
                        </tr>
                        <tr>
                          <td>Springbed</td>
                          <td>:</td>
                          <td className='ps-1'>{countJenisSampah.springbed}</td>
                        </tr>
                        <tr>
                          <td>Kursi</td>
                          <td>:</td>
                          <td className='ps-1'>{countJenisSampah.kursi}</td>
                        </tr>
                        <tr>
                          <td>Meja</td>
                          <td>:</td>
                          <td className='ps-1'>{countJenisSampah.meja}</td>
                        </tr>
                        <tr>
                          <td>Elektronik</td>
                          <td>:</td>
                          <td className='ps-1'>{countJenisSampah.elektronik}</td>
                        </tr>
                        <tr>
                          <td>Lainnya</td>
                          <td>:</td>
                          <td className='ps-1'>{countJenisSampah.lainnya}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='fw-bold'>Jenis Sampah Terangkut (Total)</h5>
                      <BarChart
                        width={500}
                        height={300}
                        data={dataSampah}
                        margin={{
                          top: 40,
                          right: 5,
                          left: 5,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey='jumlah' fill='#ffb26b' />
                      </BarChart>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mt-3'>
                <div className='col'>
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='fw-bold'>Jenis Sampah Terangkut (Bulan {currentMonth})</h5>
                      <BarChart
                        width={500}
                        height={300}
                        data={dataSampah}
                        margin={{
                          top: 40,
                          right: 5,
                          left: 5,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey='jumlah' fill='#ffb26b' />
                      </BarChart>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='fw-bold'>Jenis Sampah Terangkut (Tahun {currentYear})</h5>
                      <BarChart
                        width={500}
                        height={300}
                        data={dataSampah}
                        margin={{
                          top: 40,
                          right: 5,
                          left: 5,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey='jumlah' fill='#ffb26b' />
                      </BarChart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterAdmin></FooterAdmin>
      </div>
    </div>
  );
};

export default Statistik;
