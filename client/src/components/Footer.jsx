import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <div className='custom-footer'>
      <div className='container px-md-5'>
        <div className='row'>
          <div className='col'>
            <a className='sidebar-brand fw-bold fs-5 me-md-5' href='#'>
              Jemput Euy!
            </a>
            <div style={{ fontSize: '0.8em' }} className='pt-3'>
              <div className='text-white'>UPT Pengelolaan Sampah DLH Kota Bandung</div>
              <div className='text-white'>
                <LocationOnIcon style={{ fontSize: 'small' }}></LocationOnIcon> Jl. Surapati No.126, Cihaur Geulis, Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40122
              </div>
              <div className='text-white'>
                <LocalPhoneIcon style={{ fontSize: 'small' }}></LocalPhoneIcon> (022) 7207889
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='row' style={{ fontSize: '0.8em' }}>
          <div className='col d-flex justify-content-between'>
            <p className='text-white'>Hak Cipta &copy;2023 UPT Pengelolaan Sampah Kota Bandung</p>
            <div className='social-media text-white d-flex'>
              <motion.div
                whileHover={{
                  y: 5,
                }}
                className='ms-1'
              >
                <a href='https://www.instagram.com/upt_pengelolaansampah.dlhbdg/' target='_blank'>
                  <InstagramIcon></InstagramIcon>
                </a>
              </motion.div>
              <motion.div
                whileHover={{
                  y: 5,
                }}
                className='ms-1'
              >
                <a href='https://www.facebook.com/uptpengelolaansampah.bdg/' target='_blank'>
                  <FacebookIcon></FacebookIcon>
                </a>
              </motion.div>
              <motion.div
                whileHover={{
                  y: 5,
                }}
                className='ms-1'
              >
                <a href='https://twitter.com/UPTPS_DLHbdg' target='_blank'>
                  <TwitterIcon></TwitterIcon>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
