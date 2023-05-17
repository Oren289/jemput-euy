import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RiwayatCard from './RiwayatCard';

const ListRiwayat = (props) => {
  const navigate = useNavigate();

  if (props.riwayat.length === 0) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center p-5'>
        <div className='mb-2'>Ups! Riwayat tidak ditemukan</div>
        <button onClick={() => navigate('/layanan')} className='btn btn-info'>
          Ajukan Layanan
        </button>
      </div>
    );
  } else {
    //  props.riwayat.foreach((item) => {
    //    return <RiwayatCard></RiwayatCard>;
    //  });
    return (
      <div className='d-grid ps-0'>
        {props.riwayat.map((element) => (
          <RiwayatCard data={element} key={element.id_permintaan} dataSampah={props.dataSampah.filter((item) => item.id_permintaan === element.id_permintaan)}></RiwayatCard>
        ))}
      </div>
    );
  }
};

export default ListRiwayat;
