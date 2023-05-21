import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

// components
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import Register from './routes/Register';
import HomePage from './routes/HomePage';
import UserProfile from './routes/UserProfile';
import Layanan from './routes/Layanan';
// import { UserContextProvider } from "./context/UserContext";
import Lapor from './routes/Lapor';
import AdminDashboard from './routes/admin/AdminDashboard';
import { UserContextProvider } from './context/UserContext';
import { LayananContextProvider } from './context/LayananContext';
import DaftarLayanan from './routes/admin/DaftarLayanan';
import DaftarPengguna from './routes/admin/DaftarPengguna';
import DetailLayanan from './routes/admin/DetailLayanan';
import TambahAdmin from './routes/admin/TambahAdmin';
import PageNotFound from './routes/PageNotFound';
import ForbiddenPage from './routes/ForbiddenPage';
import TambahPetugas from './routes/admin/TambahPetugas';
import PetugasDashboard from './routes/petugas/PetugasDashboard';
import AntreanJemput from './routes/petugas/AntreanJemput';
import AntreanJemputAdmin from './routes/admin/AntreanJemputAdmin';
import DetailLayananPetugas from './routes/petugas/DetailLayananPetugas';
import PetugasRiwayat from './routes/petugas/PetugasRiwayat';
import Riwayat from './routes/Riwayat';
import DaftarAduan from './routes/admin/DaftarAduan';
import DetailAduan from './routes/admin/DetailAduan';
import Statistik from './routes/admin/Statistik';
import Map from './components/Map';
import AdminProfile from './routes/admin/AdminProfile';
import PetugasProfile from './routes/petugas/PetugasProfile';

function App() {
  const [theme, colorMode] = useMode();
  const [isOpen, setIsOpen] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState();

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isPublicAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/is-verify', {
        method: 'GET',
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setRole(parseRes.role);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isPublicAuth();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    if (!localStorage.token) {
      toast.info('Berhasil logout!');
      window.location.reload(false);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <LayananContextProvider>
            <UserContextProvider>
              <div className='app'>
                <Router>
                  <Routes>
                    <Route exact path='/login' element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to='/' />}></Route>
                    <Route exact path='/register' element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to='/' />}></Route>
                    <Route exact path='/' element={<Dashboard setAuth={setAuth} role={role} />}></Route>
                    <Route exact path='/myprofile' element={<UserProfile isAuthenticated={isAuthenticated} setAuth={setAuth} logout={logout} />}></Route>
                    <Route exact path='/layanan' element={<Layanan isAuthenticated={isAuthenticated} setAuth={setAuth} logout={logout} />}></Route>
                    {/* <Route exact path='/' element={!isAuthenticated ? <HomePage /> : <Navigate to='/dashboard' />}></Route> */}
                    <Route exact path='/lapor' element={<Lapor isAuthenticated={isAuthenticated} setAuth={setAuth} logout={logout} />}></Route>
                    <Route exact path='/riwayat' element={<Riwayat isAuthenticated={isAuthenticated} setAuth={setAuth} logout={logout} />}></Route>
                    <Route exact path='/admin-dashboard' element={<AdminDashboard isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/admin-profile' element={<AdminProfile logout={logout} />}></Route>
                    <Route exact path='/admin-daftar-layanan' element={<DaftarLayanan isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/admin-detail-layanan/:id' element={<DetailLayanan isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/admin-daftar-pengguna' element={<DaftarPengguna isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/admin-daftar-pengguna/tambah-admin' element={<TambahAdmin isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/admin-daftar-pengguna/tambah-petugas' element={<TambahPetugas isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/admin-antrean-jemput' element={<AntreanJemputAdmin isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/admin-daftar-aduan' element={<DaftarAduan isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/admin-statistik' element={<Statistik isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/admin-detail-aduan/:id' element={<DetailAduan isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/petugas-dashboard' element={<PetugasDashboard isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/petugas-profile' element={<PetugasProfile logout={logout} />}></Route>
                    <Route exact path='/petugas-antrean-jemput' element={<AntreanJemput isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/petugas-detail-layanan/:id' element={<DetailLayananPetugas isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/petugas-riwayat' element={<PetugasRiwayat isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />}></Route>
                    <Route exact path='/forbidden' element={<ForbiddenPage />}></Route>
                    <Route exact path='/map' element={<Map />}></Route>
                    <Route exact path='/*' element={<PageNotFound />}></Route>
                    {/* <Route exact path='/daftar-layanan' element={<DaftarLayananPage />}></Route> */}
                  </Routes>
                </Router>
                <ToastContainer autoClose={2000} />
              </div>
            </UserContextProvider>
          </LayananContextProvider>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
