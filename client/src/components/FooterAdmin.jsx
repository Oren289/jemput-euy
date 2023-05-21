import React from 'react';

const FooterAdmin = () => {
  return (
    <div className='admin-footer'>
      <div className='container px-md-5'>
        <div className='row'>
          <div className='col'>
            <a className='sidebar-brand fw-bold fs-5 me-md-5' href='#'>
              Jemput Euy!
            </a>
          </div>
        </div>
        <hr />
        <div className='row' style={{ fontSize: '0.8em' }}>
          <div className='col d-flex justify-content-between'>
            <p className='text-white'>Hak Cipta &copy;2023 UPT Pengelolaan Sampah Kota Bandung</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterAdmin;
