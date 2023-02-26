import React from "react";

const HomePageNav = () => {
  return (
    <div>
      <nav class='navbar navbar-expand-lg bg-body-tertiary py-3 shadow-sm'>
        <div class='container px-md-5'>
          <a class='navbar-brand fw-bold fs-2 me-md-5' href='#'>
            Jemput Euy!
          </a>
          <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span class='navbar-toggler-icon'></span>
          </button>
          <div class='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul class='navbar-nav me-auto mb-2 mb-lg-0'>
              <li class='nav-item me-4'>
                <a class='nav-link active' aria-current='page' href='/'>
                  Beranda
                </a>
              </li>
              <li class='nav-item me-4'>
                <a class='nav-link' href='/layanan'>
                  Layanan
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='#'>
                  Lapor
                </a>
              </li>
            </ul>
            <a href='/login' className='btn btn-masuk me-3 fw-bold'>
              Masuk
            </a>
            <a href='/register' className='btn btn-info'>
              Daftar
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomePageNav;
