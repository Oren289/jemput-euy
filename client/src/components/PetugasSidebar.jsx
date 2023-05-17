import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import PetugasSidebarData from './PetugasSidebarData';

const PetugasSidebar = ({ isOpen, setIsOpen }) => {
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

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
        {PetugasSidebarData.map((item, index) => {
          return (
            <NavLink to={item.link} key={index} className='link d-flex mb-2' activeClassName='active' style={{ textDecoration: 'none' }}>
              <div className='icon '>{item.icon}</div>
              <div style={{ display: isOpen ? undefined : 'none' }} className='link_text ms-2'>
                {item.title}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default PetugasSidebar;
