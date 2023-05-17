import React, { createContext, useState } from 'react';

export const LayananContext = createContext();

export const LayananContextProvider = (props) => {
  const [layanan, setLayanan] = useState([]);

  const getLayanan = async () => {
    const response = await fetch('http://localhost:5000/layanan/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
    });

    const parseRes = await response.json();
    setLayanan(parseRes.data);
  };

  return <LayananContext.Provider value={{ layanan, setLayanan, getLayanan }}>{props.children}</LayananContext.Provider>;
};
