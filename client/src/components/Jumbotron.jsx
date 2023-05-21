import React from 'react';
import jumbotronImg from '../images/recycling-waste.png';

const Jumbotron = () => {
  return (
    <div className='jumbotron'>
      <div className='container px-md-5 py-5'>
        <div className='row'>
          <div className='col-md-6 '>
            <h1 className='display-4 fw-bold text-dark-blue mt-5'>Buang sampah besar cuma dari rumah!</h1>
            <p className='text-light text-dashboard'>Buang sampah besar dari rumah. Daftar sekarang untuk dapatkan layanannya dan petugas kami yang akan menjemput ke rumah wargi Bandung.</p>
          </div>
          <div className='col-md-6 jumbo-img hidden d-md-flex align-items-end'>
            <img src={jumbotronImg} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
