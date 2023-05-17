import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const PetugasSidebarData = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    link: '/petugas-dashboard',
  },
  {
    title: 'Antrean Jemput',
    icon: <LocalShippingIcon />,
    link: '/petugas-antrean-jemput',
  },
  {
    title: 'Riwayat',
    icon: <HistoryIcon />,
    link: '/petugas-riwayat',
  },
];

export default PetugasSidebarData;
