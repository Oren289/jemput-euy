import React, { useContext, useEffect } from 'react';
import dropdownImg from '../images/blank-pp.png';
import { UserContext } from '../context/UserContext';

const AdminNavbar = ({ logout }) => {
  const { surname } = useContext(UserContext);

  return (
    <div className='container d-flex justify-content-between'>
      <div></div>
      <div className='dropdown' id='profile_dropdown'>
        <button className='btn dropdown-toggle dd-btn' type='button' id='dropdown-button' data-bs-toggle='dropdown' aria-expanded='false'>
          <img className='user-picture' src={dropdownImg} alt='profilepic' />
        </button>
        <ul className='dropdown-menu'>
          <li>
            <span className='dropdown-item-text'>Halo, {surname} &#128075;</span>
          </li>
          <li>
            <hr className='dropdown-divider' />
          </li>
          <li>
            <a href='/myprofile' className='dropdown-item'>
              Profile saya
            </a>
          </li>
          <li>
            <a href='#' className='dropdown-item'>
              Riwayat
            </a>
          </li>
          <li className='d-grid'>
            <button className='btn btn-danger d-grid mx-2 mt-3 badge' onClick={(e) => logout(e)}>
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
