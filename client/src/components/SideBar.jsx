import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarData from './SidebarData';
import { motion } from 'framer-motion';

const SideBar = ({ isOpen, setIsOpen }) => {
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const variant = {
    animate: { x: 5 },
  };

  return (
    <div className='sidebar' style={{ width: isOpen ? undefined : 'fit-content', textAlign: 'center' }}>
      <div className='sidebar-header'>
        <a className='sidebar-brand fw-bold fs-5 me-md-5' href='#' style={{ display: isOpen ? undefined : 'none' }}>
          Jemput Euy!
        </a>
        <MenuIcon className='text-light' onClick={toggle} />
      </div>
      <hr />
      <div className='sidebar-body mt-4'>
        {SidebarData.map((item, index) => {
          return (
            <motion.div whileHover='animate'>
              <NavLink to={item.link} key={index} className='link d-flex mb-2' activeClassName='active' style={{ textDecoration: 'none' }}>
                <motion.div variants={variant} className='d-flex'>
                  <div className='icon '>{item.icon}</div>
                  <div style={{ display: isOpen ? undefined : 'none' }} className='link_text ms-2'>
                    {item.title}
                  </div>
                </motion.div>
              </NavLink>
              {index === 0 ? <hr></hr> : ''}
              {index === 3 ? <hr></hr> : ''}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
