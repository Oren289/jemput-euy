import React, { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import moment from 'moment';

const RiwayatCard = ({ data, id, dataSampah }) => {
  const [sampah, setSampah] = useState([]);

  useEffect(() => {
    setSampah(dataSampah);
  }, [dataSampah]);

  return (
    <div className='card-sh-sm mb-3'>
      <div
        className={`card-header text-black fw-bold ${data.status_layanan === 'Selesai' ? 'bg-green' : ''} ${data.status_layanan === 'Ditolak' ? 'bg-red' : ''} ${
          data.status_layanan === 'Menunggu penjemputan' || data.status_layanan === 'Sedang dijemput' ? 'bg-blue' : ''
        } ${data.status_layanan === 'Menunggu proses review' ? 'bg-orange' : ''}`}
      >
        Id: {data.id_permintaan}
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-7'>
            <h6 className='fw-bold'>
              Info Pemohon <PersonIcon></PersonIcon>
            </h6>
            <hr></hr>
            <div className='row mb-1'>
              <div className='col-md-4 fw-semibold'>Nama pemohon</div>
              <div className='col'> {data.nama_pemohon}</div>
            </div>
            <div className='row mb-1'>
              <div className='col-md-4 fw-semibold'>No. Hp</div>
              <div className='col'>{data.no_hp_pemohon}</div>
            </div>
            <div className='row mb-1'>
              <div className='col-md-4 fw-semibold'>Alamat</div>
              <div className='col'>{`${data.alamat_kelurahan}, ${data.alamat_kecamatan} (${data.alamat_ket_tambahan})`}</div>
            </div>
          </div>
          <div className='col-md-5'>
            <h6 className='fw-bold mt-md-0 mt-4'>
              Keterangan Layanan <LocalShippingIcon></LocalShippingIcon>
            </h6>
            <hr></hr>
            <div className='row mb-1'>
              <div className='col-md-5 fw-semibold'>Tgl. pengajuan</div>
              <div className='col'>{moment(data.tanggal_diterima).format('D MMM YYYY')}</div>
            </div>
            <div className='row mb-1'>
              <div className='col-md-5 fw-semibold'>Tgl. selesai</div>
              <div className='col'>{data.tanggal_selesai ? moment(data.tanggal_selesai).format('D MMM YYYY') : '-'}</div>
            </div>
            <div className='row mb-1'>
              <div className='col-md-5 fw-semibold'>Jenis Sampah</div>
              <div className='col d-flex'>
                {sampah.map((item) => (
                  <div className='badge text-bg-secondary d-flex align-items-center me-1'>{item.sampah}</div>
                ))}
              </div>
            </div>
            <div className='row mb-1'>
              <div className='col-md-5 fw-semibold'>Jumlah Sampah</div>
              <div className='col'>{data.jumlah_sampah}</div>
            </div>
            <div className='row mb-1'>
              <div className='col-md-5 fw-semibold'>Petugas</div>
              <div className='col'>{data.username_petugas ? data.username_petugas : <div className='text-danger'>Belum ditetapkan</div>}</div>
            </div>
            <div className='row mb-1'>
              <div className='col-md-5 fw-semibold'>Status</div>
              <div className='col'>{data.status_layanan}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatCard;
