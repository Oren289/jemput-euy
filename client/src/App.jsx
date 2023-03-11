import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// components
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import Register from "./routes/Register";
import HomePage from "./routes/HomePage";
import UserProfile from "./routes/UserProfile";
import Layanan from "./routes/Layanan";
// import { UserContextProvider } from "./context/UserContext";
import Lapor from "./routes/Lapor";
import AdminDashboard from "./routes/admin/AdminDashboard";
import { UserContextProvider } from "./context/UserContext";
import { LayananContextProvider } from "./context/LayananContext";
import DaftarLayanan from "./routes/admin/DaftarLayanan";

function App() {
  const [theme, colorMode] = useMode();
  const [isOpen, setIsOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    if (!localStorage.token) {
      toast.info("Berhasil logout!");
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
                    <Route exact path='/myprofile' element={<UserProfile isAuthenticated={isAuthenticated} setAuth={setAuth} logout={logout} />}></Route>
                    <Route exact path='/layanan' element={<Layanan isAuthenticated={isAuthenticated} setAuth={setAuth} logout={logout} />}></Route>
                    <Route exact path='/' element={<Dashboard setAuth={setAuth} />}></Route>
                    {/* <Route exact path='/' element={!isAuthenticated ? <HomePage /> : <Navigate to='/dashboard' />}></Route> */}
                    <Route exact path='/lapor' element={<Lapor isAuthenticated={isAuthenticated} setAuth={setAuth} logout={logout} />}></Route>
                    <Route exact path='/admin-dashboard' element={<AdminDashboard isOpen={isOpen} setIsOpen={setIsOpen} />}></Route>
                    <Route exact path='/admin-daftar-layanan' element={<DaftarLayanan isOpen={isOpen} setIsOpen={setIsOpen} />}></Route>
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
