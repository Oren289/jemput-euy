import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState("");
  const [userAddress, setUserAddress] = useState({});

  const getUsername = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setUsername(parseRes.username_pengguna);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setUserData(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUserAddress = async (checkbox) => {
    try {
      const response = await fetch("http://localhost:5000/user/address", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setUserAddress(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  };

  return <UserContext.Provider value={{ username, setUsername, userData, setUserData, userAddress, setUserAddress, getUsername, getUserData, getUserAddress }}>{props.children}</UserContext.Provider>;
};
