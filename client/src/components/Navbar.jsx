import React, { useEffect } from 'react';
import dropdownImg from '../images/blank-pp.png';

const Navbar = ({ username, logout }) => {
  const dropdownToggle = () => {
    const dropdown = document.getElementById('profile_dropdown');
    const buttonGroup = document.getElementById('login_register_buttongroup');

    const token = localStorage.getItem('token');

    if (username) {
      buttonGroup.classList.remove('d-none');
      dropdown.classList.remove('d-none');
      buttonGroup.classList.add('d-none');
    } else {
      dropdown.classList.remove('d-none');
      buttonGroup.classList.remove('d-none');
      dropdown.classList.add('d-none');
    }
  };

  useEffect(() => {
    dropdownToggle();
  }, [username]);

  return (
    <div>
      <nav className='navbar navbar-expand-lg bg-body-tertiary py-2 shadow'>
        <div className='container px-md-5'>
          <a className='navbar-brand fw-bold fs-4 me-md-5' href='#'>
            Jemput Euy!
          </a>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item me-4'>
                <a className='nav-link fw-bold' aria-current='page' href='/'>
                  Beranda
                </a>
              </li>
              <li className='nav-item me-4'>
                <a className='nav-link fw-bold' href='/lapor'>
                  Lapor
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link fw-bold' href='/layanan'>
                  Layanan
                </a>
              </li>
            </ul>
            <div className='dropdown d-none' id='profile_dropdown'>
              <button className='btn dropdown-toggle dd-btn' type='button' id='dropdown-button' data-bs-toggle='dropdown' aria-expanded='false'>
                <img className='user-picture' src={dropdownImg} alt='profilepic' />
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <span className='dropdown-item-text'>Halo, {username} &#128075;</span>
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
                  <a href='/riwayat' className='dropdown-item'>
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
            <div id='login_register_buttongroup'>
              <a href='/login' className='btn btn-masuk me-3 fw-bold'>
                Masuk
              </a>
              <a href='/register' className='btn btn-info'>
                Daftar
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
